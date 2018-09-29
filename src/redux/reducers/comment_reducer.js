import { ADD_COMMENT, DELETE_COMMENT, GET_COMMENTS, GET_TOP_COMMENT} from '../constants/ActionTypes'

const initialState = {
  comments:[
    {title: 'This is a longer comment, I think that you are wrong at the beginning', id: 1, user:"Oscar", time: 0},
    {title: 'Time 11!', id: 2, user:"Martin", time: 11},
    {title: 'Time 21!', id: 5, user:"Oscar", time: 21},
    {title: 'Late comments', id: 8, user:"Martin", time: 180}
  ]
}

export default function comments(state = initialState, action) {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        comments: [...state.comments, action.comment]
      }

    case DELETE_COMMENT:
      return state.comments.filter(comment =>
        comment.id !== comment.id
      )
  

    default:
      return state
  }
}