import { Address } from "./addres.model";
import { StudentDetails } from "./studentDetails.model";
import { User } from "./user.model";

export class Student extends User{
    public studentDetails: StudentDetails;
    public studentStatus: string;
    public address: Address;
    
    
}