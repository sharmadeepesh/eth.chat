// SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0 < 0.9.0;

// Contract for the Ethereum Chat App
contract ChatApp {

    // The User structure contains a name and the list of friends.
    struct user{
        string name;
        string enckey;
        friend[] friendList;
    }

    // The Friends structure contains a pubkey and a name.
    struct friend{
        address pubkey;
        string name;
    }

    // Every Message has a sender address, a timestamp for when it was sent
    // and a string msg containing the actual message.
    struct message {
        address sender;
        uint256 timestamp;
        string msg;
    }

    // A structure to map user names with wallet addresses, used for peer
    // discovery and adding friends/
    struct AllUserStruct {
        string name;
        address accountAddress;
    }

    AllUserStruct[] getAllUsers; 

    // an address to user map (named as userList)
    mapping(address => user) userList;
    // a bytes32 to message array map (named allMessages)
    mapping(bytes32 => message[]) allMessages;
    
    // Check if username exists for a particular address in the userList mapping.
    function checkUserExists(address pubkey) public view returns(bool) {
        return bytes(userList[pubkey].name).length > 0;
    }

    // Check if a user exists, require a user name
    // Add the specified user name to the userList mapping with the account address 
    // and push the data to the AllUserStruct
    function createAccount(string calldata name, string calldata enckey) external {
        require(checkUserExists(msg.sender) == false, "User already exists");
        require(bytes(name).length > 0, "Username can't be empty");

        userList[msg.sender].name = name;
        userList[msg.sender].enckey = enckey;

        getAllUsers.push(AllUserStruct(name, msg.sender));
    }

    // Basic checks then return the username for a wallet address.
    function getUsername(address pubkey) external view returns(string memory) {
        require(checkUserExists(pubkey), "User is not registered");
        return userList[pubkey].name;
    }

    // Some basic checks:
    // - Check if both the users exist
    // - User shouldn't be adding themselves as friend
    // - Check if already friends
    // Call the _addFriend function from both accounts if checks are successful
    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(msg.sender != friend_key, "User cannot add themselves as friends");
        require(checkAlreadyFriends(msg.sender, friend_key) == false, "These users are already friends");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    // Check if two users are already friends.
    function checkAlreadyFriends(address pubkey1, address pubkey2) internal view returns(bool) {
        
        // Swap the public keys of both users if the first user has more friends
        // We're using pubkey1 in the next for loop, keeping the address with the
        // smaller friendList ensures so we always traverse the smaller friendList.
        if(userList[pubkey1].friendList.length > userList[pubkey2].friendList.length) {
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for (uint256 i = 0; i < userList[pubkey1].friendList.length; i++) {
            if (userList[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }

        return false;
    }

    // Function to add two users as friends.
    // Create an instance of friend with the second user's address/name 
    // and push it to the first user's friendList.
    function _addFriend(address me, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);

        userList[me].friendList.push(newFriend);
    }

    // Returns the friendlist of a user.
    function getMyFriendList() external view returns(friend[] memory) {
        return userList[msg.sender].friendList;
    }

    // Get the bytes32 chat code for a conversation between two users.
    // The if statement ensures we always get the same bytes32 address for a pair
    // the larger address is always put first in the encodePacked() function.
    function _getChatCode(address pubkey1, address pubkey2) internal pure returns(bytes32) {
        if (pubkey1 > pubkey2) {
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        }
        else {
            return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    // Sends a message from one user to the other
    // Basic checks (check users exist and check if friends)
    // Get the chat code and create a new isntance of message.
    // Then push it to the allMessages struct with the chatCode argument.
    function sendMessage(address friend_key, string calldata _msg) external {
        require(checkUserExists(msg.sender), "Create an account first");
        require(checkUserExists(friend_key), "User is not registered");
        require(checkAlreadyFriends(msg.sender, friend_key), "You are not friend with the given user");
        require(bytes(_msg).length != 0, "Message cannot be empty");

        bytes32 chatCode = _getChatCode(msg.sender, friend_key);

        message memory newMsg = message(msg.sender, block.timestamp, _msg);
        allMessages[chatCode].push(newMsg);
    }

    // Returns the messages for a particular chatCode
    // gets the chatCode for two user address then returns all the messages
    // from the allMessages struct.
    function readMessage(address friend_key) external view returns(message[] memory) {
        bytes32 chatCode = _getChatCode(msg.sender, friend_key);
        return allMessages[chatCode];
    }

    // Returns the list of all users registered on the system.
    function getAllAppUser() public view returns(AllUserStruct[] memory) {
        return getAllUsers;
    }

    function getEncKey(address user) external view returns(string memory) {
        return userList[user].enckey;
    }

}