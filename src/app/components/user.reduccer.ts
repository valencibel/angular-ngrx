import * as fromUser from 'src/app/components/user.actions';
import { User } from '../models/user.model';

const user1 = new User('test1@gmail.com', '123');
const user2 = new User('test2@gmail.com', '123');
const stateInitial: User[] = [user1, user2];

export function userReducer( state = stateInitial, action: fromUser.Actions) {
    switch (action.type) {
        case fromUser.ADD_USER:
            const user = new User(action.email, action.password);
            return [...state, user];
        case fromUser.UPDATE_USER:
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
        case fromUser.DELETE_USER:
            return state.filter( (userItem) => {
                return userItem.id !== action.id;
            });
        default:
            return state;
    }
}
