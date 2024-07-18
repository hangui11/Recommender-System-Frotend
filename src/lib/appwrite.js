import { ID, Client, Account, Databases, Query} from 'appwrite';

export const appwriteConfig = {
    endpoints: 'https://cloud.appwrite.io/v1',
    projectId: '668e4a8b002e7c630f01',
    databaseId: '66990f4f0017ddd4f4b5',
    userCollectionId: '66990f6d000ffedc261d'
}

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoints)
    .setProject(appwriteConfig.projectId); // Replace with your project ID

const account = new Account(client)
const databases = new Databases(client)

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        const user = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('email', email)]);
        alert(error.message)
        if (user.documents[0]) throw new Error('Wrong password')
        else if(! user.documents[0]) throw new Error('Not exist the user with email: ' + email);
        else throw error
    } 
}

export const signUp = async (email, password, username, avatarURL) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        
        if (! newAccount) throw new Error('Account creation failed')

        // await account.createEmailPasswordSession(email, password)

        const userDocuments = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId);
        const user_size = userDocuments.total; // Use the 'total' field to get the count of documents

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.userCollectionId, 
            ID.unique(),
            {
                account_id: newAccount.$id,
                user_id: user_size,
                username: username,
                email: email,
                avatar: avatarURL
            }
        )
        return newUser

    } catch(error) {
        console.log(error)
        throw new Error(error)
    } 
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (! currentAccount) throw new Error('No exist login account')

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currentAccount.$id)])
        if (! currentUser) throw new Error('No exist user related with account')
        return currentUser.documents[0] 

    } catch (error) {
        alert(error.message)
    }
}
