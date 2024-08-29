// SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0 < 0.9.0;

// Contract for the Ethereum Chat App
contract ChatApp {

    // The User structure contains a name and the list of friends.
    struct users{
        string username;
        string encryptionKey;
        friends[] listOfFriends;
    }

    // The Friends structure contains a pubkey and a name.
    struct friends{
        address publicKey;
        string username;
    }

    // Every Message has a sender address, a timestamp for when it was sent
    // and a string msg containing the actual message.
    struct messages {
        address senderAddress;
        uint256 messageTimestamp;
        string msg;
    }

    // A structure to map user names with wallet addresses, used for peer
    // discovery and adding friends/
    struct UserStruct {
        string username;
        address accountAddress;
    }

    UserStruct[] listOfUsers; 

    // an address to user map (named as userList)
    mapping(address => users) allRegisteredUsersList;
    // a bytes32 to message array map (named allMessages)
    mapping(bytes32 => messages[]) allTransmittedMessages;
    

    // Check if a user exists, require a user name
    // Add the specified user name to the userList mapping with the account address 
    // and push the data to the AllUserStruct
    function createUserAccount(string calldata username, string calldata encryptionKey) external {
        require(checkIfAUserExists(msg.sender) == false, "User already exists");
        require(bytes(username).length > 0, "Username can't be empty");

        allRegisteredUsersList[msg.sender].username = username;
        allRegisteredUsersList[msg.sender].encryptionKey = encryptionKey;

        listOfUsers.push(UserStruct(username, msg.sender));
    }

    // Check if username exists for a particular address in the userList mapping.
    function checkIfAUserExists(address publicKey) public view returns(bool) {
        return bytes(allRegisteredUsersList[publicKey].username).length > 0;
    }

    // Some basic checks:
    // - Check if both the users exist
    // - User shouldn't be adding themselves as friend
    // - Check if already friends
    // Call the _addFriend function from both accounts if checks are successful
    function addUserAsFriend(address friendPublicKey, string calldata username) external {
        require(checkIfAUserExists(msg.sender), "Create an account first");
        require(checkIfAUserExists(friendPublicKey), "User is not registered");
        require(msg.sender != friendPublicKey, "User cannot add themselves as friends");
        require(checkIfUsersAlreadyFriends(msg.sender, friendPublicKey) == false, "These users are already friends");

        _addUserAsFriend(msg.sender, friendPublicKey, username);
        _addUserAsFriend(friendPublicKey, msg.sender, allRegisteredUsersList[msg.sender].username);
    }

    // Check if two users are already friends.
    function checkIfUsersAlreadyFriends(address publicKey1, address publicKey2) internal view returns(bool) {
        
        // Swap the public keys of both users if the first user has more friends
        // We're using pubkey1 in the next for loop, keeping the address with the
        // smaller friendList ensures so we always traverse the smaller friendList.
        if(allRegisteredUsersList[publicKey1].listOfFriends.length > allRegisteredUsersList[publicKey2].listOfFriends.length) {
            address temporary = publicKey1;
            publicKey1 = publicKey2;
            publicKey2 = temporary;
        }

        for (uint256 iter = 0; iter < allRegisteredUsersList[publicKey1].listOfFriends.length; iter++) {
            if (allRegisteredUsersList[publicKey1].listOfFriends[iter].publicKey == publicKey2) return true;
        }

        return false;
    }


    // Basic checks then return the username for a wallet address.
    function getSpecificUsername(address publicKey) external view returns(string memory) {
        require(checkIfAUserExists(publicKey), "User is not registered");
        return allRegisteredUsersList[publicKey].username;
    }


    // Returns the friendlist of a user.
    function getMyListOfFriends() external view returns(friends[] memory) {
        return allRegisteredUsersList[msg.sender].listOfFriends;
    }

    // Get the bytes32 chat code for a conversation between two users.
    // The if statement ensures we always get the same bytes32 address for a pair
    // the larger address is always put first in the encodePacked() function.
    function _getConversationChatCode(address publicKey1, address publicKey2) internal pure returns(bytes32) {
        if (publicKey1 > publicKey2) {
            return keccak256(abi.encodePacked(publicKey1, publicKey2));
        }
        else {
            return keccak256(abi.encodePacked(publicKey2, publicKey1));
        }
    }

    // Function to add two users as friends.
    // Create an instance of friend with the second user's address/name 
    // and push it to the first user's friendList.
    function _addUserAsFriend(address myPublicAddress, address friendPublicKey, string memory username) internal {
        friends memory friendObject = friends(friendPublicKey, username);

        allRegisteredUsersList[myPublicAddress].listOfFriends.push(friendObject);
    }

    // Sends a message from one user to the other
    // Basic checks (check users exist and check if friends)
    // Get the chat code and create a new isntance of message.
    // Then push it to the allMessages struct with the chatCode argument.
    function sendMessage(address friendPublicKey, string calldata _msg) external {
        require(checkIfAUserExists(msg.sender), "Create an account first");
        require(checkIfAUserExists(friendPublicKey), "User is not registered");
        require(checkIfUsersAlreadyFriends(msg.sender, friendPublicKey), "You are not friend with the given user");
        require(bytes(_msg).length != 0, "Message cannot be empty");

        bytes32 conversationCode = _getConversationChatCode(msg.sender, friendPublicKey);

        messages memory msgObject = messages(msg.sender, block.timestamp, _msg);
        allTransmittedMessages[conversationCode].push(msgObject);
    }

    // Returns the messages for a particular chatCode
    // gets the chatCode for two user address then returns all the messages
    // from the allMessages struct.
    function readMessagesInConversation(address friendPublicKey) external view returns(messages[] memory) {
        bytes32 conversationCode = _getConversationChatCode(msg.sender, friendPublicKey);
        return allTransmittedMessages[conversationCode];
    }

    // Returns the list of all users registered on the system.
    function getListOfAllAppUsers() public view returns(UserStruct[] memory) {
        return listOfUsers;
    }

    function getUsersEncryptionKey(address userAddress) external view returns(string memory) {
        return allRegisteredUsersList[userAddress].encryptionKey;
    }

}