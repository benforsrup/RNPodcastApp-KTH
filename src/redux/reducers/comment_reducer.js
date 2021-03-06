import { ADD_COMMENT,
   DELETE_COMMENT, 
   RECEIVED_COMMENTS_BY_PODCAST,
   RECEIVED_NEW_COMMENT,
   TOGGLE_REPLY,
   RECEIVED_UPVOTE} from '../constants/ActionTypes'

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


export default function comments(state =[], action) {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        ...state, action.comment
      ]

    case DELETE_COMMENT:
      return state.filter(comment =>
        comment.id !== comment.id
      )
    case RECEIVED_UPVOTE:
      return state.map(comment => {
        if (comment.id !== action.id) {
          return comment;
        }
        return {
          ...comment,
          upvotes: comment.upvotes + action.inc
        };
      })
     
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
    
    case RECEIVED_COMMENTS_BY_PODCAST:
      return action.comments
    
    case RECEIVED_NEW_COMMENT:
      return [
        ...state, action.comment
      ]

    


    default:
      return state
  }
}