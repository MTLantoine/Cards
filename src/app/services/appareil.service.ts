import { Subject } from "rxjs/Subject";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class AppareilService {
  lastUpdate = new Date();

  appareilsSubject = new Subject<any[]>();

  public appareils = [];

  private generateAppareils = [
    "Barbecue",
    "Bouilloire",
    "Centrifugeuse pour fruits et légumes",
    "Cuiseur de riz (auto-cuiseur de riz)",
    "Cuit vapeur",
    "Fouet électrique",
    "Grille-pain",
    "Machine à pain",
    "Mixeur",
    "Multicuiseur",
    "Pierrade",
    "Presse-agrumes",
    "Robot de cuisine ou multifonctions",
    "Service à raclette",
    "Wok",
    "Pèse-personne",
    "Brosse à dents et Hydropulseur",
    "Épilateur",
    "Rasoir",
    "Sèche-cheveux",
    "Cafetière",
    "Expresso",
    "Moulin à café",
    "Aspirateur",
    "Cireuse",
    "Nettoyeur à vapeur",
    "Tondeuse robot",
    "Centrale vapeur",
    "Fer à repasser",
    "Presse à repasser",
    "Rouleau à repasser",
    "Table à repasser",
    "Cuisinière",
    "Four micro-ondes",
    "Four traditionnel",
    "Four à vapeur",
    "Cuisinière à gaz",
    "Hotte aspirante",
    "Plaque de cuisson",
    "Lave-linge",
    "Lave-vaisselle",
    "Sèche-linge",
    "Cave à vin",
    "Congélateur",
    "Réfrigérateur",
    "Climatiseur"
  ];

  private generateStatus = ["allumé", "éteint"];

  constructor(private httpClient: HttpClient) {}

  emitAppareilSubject() {
    this.appareilsSubject.next(this.appareils.slice());
  }

  deleteAll() {
    if (this.appareils.length === 0) {
      alert("Aucune donnée à supprimer ...");
    }
    for (let i = this.appareils.length - 1; i >= 0; i--) {
      this.removeAppareil(i);
    }
    this.saveAppareilsToServer();
  }

  switchOnAll() {
    for (let appareil of this.appareils) {
      if (appareil.status === "éteint") {
        appareil.status = "allumé";
        appareil.update = new Date();
      }
    }
    this.emitAppareilSubject();
    this.saveAppareilsToServer();
  }

  switchOffAll() {
    for (let appareil of this.appareils) {
      if (appareil.status === "allumé") {
        appareil.status = "éteint";
        appareil.update = new Date();
      }
    }
    this.emitAppareilSubject();
    this.saveAppareilsToServer();
  }

  switchOnOne(i: number) {
    this.appareils[i].status = "allumé";
    this.appareils[i].update = new Date();
    this.emitAppareilSubject();
  }

  switchOffOne(i: number) {
    this.appareils[i].status = "éteint";
    this.appareils[i].update = new Date();
    this.emitAppareilSubject();
  }

  getAppareilById(id: number) {
    const appareil = this.appareils.find(s => {
      return s.id === id;
    });
    return appareil;
  }

  addAppareil(name: string, status: string) {
    const appareilObject = {
      id: 0,
      name: "",
      status: "",
      update: new Date()
    };
    appareilObject.name = name;
    appareilObject.status = status;
    if (this.appareils.length > 0) {
      appareilObject.id = this.appareils[this.appareils.length - 1].id + 1;
    }
    this.appareils.push(appareilObject);
    this.emitAppareilSubject();
    this.saveAppareilsToServer();
  }

  saveAppareilsToServer() {
    this.httpClient
      .put("https://exo-cards.firebaseio.com/appareils.json", this.appareils)
      .subscribe(
        () => {
          console.log("Enregistrement terminé !");
        },
        error => {
          console.log("Erreur ! : " + error);
        }
      );
  }

  getAppareilsFromServer() {
    this.httpClient
      .get<any[]>("https://exo-cards.firebaseio.com/appareils.json")
      .subscribe(
        response => {
          if (response === null) {
            alert("Aucune donnée trouvée ...");
            this.emitAppareilSubject();
          } else {
            this.appareils = response;
            this.emitAppareilSubject();
          }
        },
        error => {
          console.log("Erreur ! : " + error);
        }
      );
  }

  removeAppareil(index: number) {
    this.appareils.splice(index, 1);
    this.emitAppareilSubject();
  }

  handleId(min: number) {
    for (let i = min; i < this.appareils.length; i++) {
      this.appareils[i].id--;
    }
  }

  generateAppareil() {
    this.addAppareil(
      this.generateAppareils[
        Math.floor(Math.random() * this.generateAppareils.length)
      ],
      this.generateStatus[
        Math.floor(Math.random() * this.generateStatus.length)
      ]
    );
  }
}
