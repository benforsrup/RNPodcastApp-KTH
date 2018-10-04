import { ADD_COMMENT,
   DELETE_COMMENT, 
   GET_COMMENTS, 
   GET_TOP_COMMENT, 
   TOGGLE_HAS_REPLIES,
   TOGGLE_REPLY} from '../constants/ActionTypes'

const initialState = [
    {
      title: 'This is a longer comment', 
      id: 1, 
      user:"Oscar", 
      time: 5,
      isParent:true,
      showReply: false,
    },
    {
      title: 'This is a reply',
      id: 10, 
      user:"Martin", 
      isParent: false,
      parentId: 1
    },
    {
      title: 'This is a another reply',
      id: 11, 
      user:"Adrian", 
      isParent: false,
      parentId: 2
    },
    {title: 'You are correct', id: 2, user:"Martin", time: 11, isParent: true, hasReplies: true, showReply: false},
    {title: 'Time 21!', id: 5, user:"Oscar", time: 21, isParent: true},
    {title: 'Late comments', id: 8, user:"Martin", time: 180, isParent: true}
  ]


export default function comments(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      let newComment = action.comment
      return [
        ...state, action.comment
      ]

    case DELETE_COMMENT:
      return state.filter(comment =>
        comment.id !== comment.id
      )
    case TOGGLE_REPLY:
      return state.map(comment => {
        if (comment.id !== action.id) {
          return comment;
        }
        return {
          ...comment,
          showReply: !comment.showReply
        };
      })

    


    default:
      return state
  }
}