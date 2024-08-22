import { expect } from "chai";

describe("ChatApp", function() {
    let ChatApp;
    let chatApp;
    let owner;
    let user1;
    let user2;
    let user3;
    let user4;

    this.beforeEach(async function () {
        ChatApp = await ethers.getContractFactory("ChatApp");
        [ owner, user1, user2, user3, user4] = await ethers.getSigners();
        chatApp = await ChatApp.deploy();
        await chatApp.deployed();
    });

    describe("Account Creation", function () {
        it("Let user create a new account", async function () {
            await chatApp.connect(user1).createAccount("testuser1", "testkey1");
            expect(await chatApp.getUsername(user1.address)).to.equal("testuser1");
        });

        it("Prevent account creation with empty username", async function () {
            await expect(chatApp.connect(user1).createAccount("", "testkey1")).to.be.revertedWith("Username can't be empty");
        });

        it("Do not allow creating multiple accounts from the same address", async function() {
            await chatApp.createAccount("testuser1", "testkey1");
            await expect(chatApp.createAccount("testuser2", "testkey2")).to.be.revertedWith("User already exists");
        });
    });

    describe("Managing Friends", function () {
        this.beforeEach(async function() {
            await chatApp.connect(user1).createAccount("testuser1", "testkey1");
            await chatApp.connect(user2).createAccount("testuser2", "testkey2");
        });

        it("Allow users to add a friend", async function () {
            await chatApp.connect(user1).addFriend(user2.address, "testuser2");
            const friendsList = await chatApp.connect(user1).getMyFriendList();
            expect(friendsList[0].name).to.equal("testuser2");
        });

        it("Prevent adding your own account as a friend", async function () {
            await expect(chatApp.connect(user1).addFriend(user1.address, "testuser1")).to.be.revertedWith("User cannot add themselves as friends");
          });

        it("Should not allow adding the same friend twice", async function() {
            await chatApp.connect(user1).addFriend(user2.address, "testuser2");
            await expect(chatApp.connect(user1).addFriend(user2.address, "testuser2")).to.be.revertedWith("These users are already friends");
        });

    });

    describe("Messaging", function () {
        beforeEach(async function() {
          // Setup users and add friends
          await chatApp.connect(user1).createAccount("testuser1", "testkey1");
          await chatApp.connect(user2).createAccount("testuser2", "testkey2");
          await chatApp.connect(user4).createAccount("testuser4", "testkey4");
          await chatApp.connect(user1).addFriend(user2.address, "testuser2");
        });
    
        it("Send and receive a message", async function () {
          await chatApp.connect(user1).sendMessage(user2.address, "Hello Test User 2!");
          const messages = await chatApp.connect(user1).readMessage(user2.address);
          expect(messages[0].msg).to.equal("Hello Test User 2!");
        });
    
        it("Should not send a message to a non-registered user", async function () {
          await expect(chatApp.connect(user1).sendMessage(user3.address, "Hello, please register!")).to.be.revertedWith("User is not registered");
        });

        it("Do not send a message to a non-friend user", async function () {
            await expect(chatApp.connect(user1).sendMessage(user4.address, "Hello my non-friend!")).to.be.revertedWith("You are not friend with the given user");
          });

        it("Do not allow sending an empty message", async function() {
            await expect(chatApp.connect(user1).sendMessage(user2.address, "")).to.be.revertedWith("Message cannot be empty");
        });

      });

});