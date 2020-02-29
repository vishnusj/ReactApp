export const createProject = (project) => {
    return (dispatch, getState, {getFirestore}) => {
      // make async call to database
      const firestore = getFirestore();
      firestore.collection('projects').add({
        ...project,
        authorFirstName: 'Net',
        authorLastName: 'Ninja',
        authorId: 12345,
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