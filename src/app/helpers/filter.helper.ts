import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
export class FilterHelper{

    public filter(e, dataSource = null) {
        let target;
        if(dataSource != null){
          e.source = dataSource;
          target = e.target;
         }else{
          target = e.e.target;
        }
         const filterValue = (target as HTMLInputElement).value;
         e.source.filter = filterValue.trim().toLowerCase();
        if (e.source.paginator) {
          e.source.paginator.firstPage();
        }
      }
}