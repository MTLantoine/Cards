import { User } from "../models/User.model";
import { Subject } from "rxjs/Subject";
import { HttpClient } from "@angular/common/http";

export class UserService {
  userSubject = new Subject<User[]>();

  constructor(private httpClient: HttpClient) {}

  private users: User[] = [];
  private firstname: string;
  private lastname: string;

  emitUsers() {
    this.userSubject.next(this.users.slice());
  }

  addUser(user: User) {
    this.users.push(user);
    this.emitUsers();
  }

  getUser(email: string, password: string): User {
    const user = this.users.find(s => {
      return s.email === email;
    });
    if (user === undefined) {
      return null;
    } else {
      if (password === user.password) {
        this.firstname = user.firstName;
        this.lastname = user.lastName;
        return user;
      } else {
        return null;
      }
    }
  }

  getFirstname() {
    return this.firstname;
  }

  getLastname() {
    return this.lastname;
  }

  saveUsersToServer() {
    this.httpClient
      .put("https://exo-cards.firebaseio.com/users.json", this.users)
      .subscribe(
        () => {
          console.log("Enregistrement terminé !");
        },
        error => {
          console.log("Erreur ! : " + error);
        }
      );
  }

  getUsersFromServer() {
    this.httpClient
      .get<any[]>("https://exo-cards.firebaseio.com/users.json")
      .subscribe(
        response => {
          if (response === null) {
            this.emitUsers();
          } else {
            this.users = response;
            this.emitUsers();
          }
        },
        error => {
          console.log("Erreur ! : " + error);
        }
      );
  }
}
