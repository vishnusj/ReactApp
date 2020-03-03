export const createProject = (project) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;
      firestore.collection('projects').add({
        ...project,
        authorFirstName: profile.firstName,
        authorLastName: profile.lastName,
        authorId: authorId,
        createdAt: new Date()
        }).then(() => {
            console.log('Create Hit');
            dispatch({type: 'CREATE', project});
        }).catch((err) => {
            console.log('error Hit');
            dispatch({type: 'CREATE_ERROE', err});
        })
        
    }
}