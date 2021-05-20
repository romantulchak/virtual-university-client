import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Link } from "../model/link.model";

@Injectable({
    providedIn:'root'
})
export class LinkService{

    public links: BehaviorSubject<Link[]> = new BehaviorSubject(null);

}