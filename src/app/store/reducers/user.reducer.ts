import * as fromUser from 'src/app/store/actions/user.actions';
import { User } from 'src/app/models/user.model'; 

const user1 = new User('test1@test.com', '123');
const user2 = new User('test2@test.com', '123');
const initialState: User[] = [user1, user2];

export function userReducer(state = initialState, action: fromUser.All) {
    switch (action.type) {
        case fromUser.UserActionTypes.ADD_USER:
            const user = new User(action.email, action.password);
            return [...state, user];
        case fromUser.UserActionTypes.UPDATE_USER:
            return state.map( (userItem) => {
                if ( userItem.id === action.id ) {
                    return {
                        ...userItem,
                        email: action.email
                    };
                } else {
                    return userItem;
                }
            });
        case fromUser.UserActionTypes.DELETE_USER:
            return state.filter( (userItem) => {
                return userItem.id !== action.id;
            });
        default:
            return state;
    }
}
