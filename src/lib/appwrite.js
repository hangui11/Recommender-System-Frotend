import { ID, Client, Account, Databases, Query} from 'appwrite';

export const appwriteConfig = {
    endpoints: 'https://cloud.appwrite.io/v1',
    projectId: '668e4a8b002e7c630f01',
    databaseId: '66990f4f0017ddd4f4b5',
    userCollectionId: '66990f6d000ffedc261d',
    movieCollectioId: '669a2e750039ed43c7b1',
    ratingCollectionId: '669a2ffd00262479f9fa'
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
        // alert(error.message)
        if (user.documents[0]) throw new Error('Wrong password')
        else if(! user.documents[0]) throw new Error('Not exist the user with email: ' + email);
        else throw error
    } 
}

export const logOut = async() => {
    try {
        const session = await account.deleteSession('current')
        return session
    } catch (error) {
        alert(error.message)
    }
}

export const signUp = async (email, password, username, avatarURL) => {
    try {

        const taken = await existUsername(username)
        if (taken) throw new Error('Username is already taken')

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

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('account_id', currentAccount.$id)])
        if (! currentUser) throw new Error('No exist user related with account')
        return currentUser.documents[0] 

    } catch (error) {
        alert('Do not have user logged')
    }
}

export const existCurrentUser = async () => {
    try {
        const currentAccount = await account.get()

        if (! currentAccount) return false

        const currentUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('account_id', currentAccount.$id)])
        if (! currentUser) return false
        return true

    } catch (error) {
        return false
    }
}

export const existUsername = async (username) => {
    try {
        const result = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('username', username)])
        return result.total > 0
    } catch (error) {
        console.error('Error checking username:', error.message);
        throw new Error('Error checking username');
    }
}

export const verification = async () => {
    account.createVerification('https://sunshine-movies.vercel.app/verfication')
}


export const forgotPassword = async (email) => {
    try {
        await account.createRecovery(email, 'https://sunshine-movies.vercel.app/forgotPassword')
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
    
}

export const resetPassword = async (secret, user_id, password) => {
    try {
        await account.updateRecovery(user_id, secret, password)
    } catch (error) {
        console.log(error)
        throw new Error(error)
    }
}

export const getUserEmail = async (user_id) => {
    console.log(user_id)
    try {
        const result = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('account_id', user_id)])
        const user = result.documents[0]
        
        console.log(user)
        return user.email
    } catch (error) {
        throw new Error(error)
    }
} 

export const getLatestMovies = async() => {
    try {
        const result = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.movieCollectioId, [Query.orderDesc('$createdAt'), Query.limit(20)])
        return result.documents
    } catch (error) {
        alert('Error in getLatestMovies: ' + error.message)
        throw new Error('Error in getLatestMovies: ' + error.message)
    }
}


export const getAllSearchMovies = async (query, limit=25) => {
    let allDocuments = [];
    let offset = 0;
    let hasMore = true;
    while (hasMore) {
        try {
            const result = await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.movieCollectioId, 
                [
                    Query.contains('title', query),
                    Query.limit(limit),
                    Query.offset(offset)
                ]
            )
            if (result.documents.length > 0) {
                allDocuments = allDocuments.concat(result.documents);
                offset += limit; // Actualiza el offset para la siguiente solicitud
            } else {
                hasMore = false; // No hay más documentos
            }
        } catch (error) {
            console.log(error.message)
            throw new Error
        }
    }
    return allDocuments;
}