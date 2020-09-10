import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl,Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {Contact} from './contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit
{

  //Declarations 
  addContactForm: FormGroup;
  editContactForm:FormGroup;
  co:Contact[]=[
    {fname:"Arijeet",lname:"Banerjee",pnumber:"9113329548"},
    {fname:"Arpan",lname:"Banerjee",pnumber:"7003099339"},
    {fname:"Shikhar",lname:"Sinha",pnumber:"7905264729"},
  ]
  closeResult='';
  name:string;
  nameSearch:string;
  str:string;

  //Constructors
  constructor(private fb: FormBuilder, private modalService: NgbModal) {}
  ngOnInit() {
    this.co.sort((a,b)=>(a.fname>b.fname?1:-1));
    this.addContactForm = this.fb.group({
    fname: ['',Validators.required],
    lname: ['',Validators.required],
    pnumber: ['',[Validators.required,Validators.pattern('[0-9]{10}')]],
  });
  }

  //To Open a Add Contact Form
  openAdd(content:FormGroup)
  {
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title'}).result.then( 
      result => { this.closeResult = `Closed with: ${result}`; }
    );
  }
 
  //To Add a Contact
  onSubmitAdd(c:Contact){
    this.co.push(c);
    console.log(c);
    alert('Contact Added Successfully !');
    this.modalService.dismissAll();
    this.co.sort((a,b) => (a.fname>b.fname?1:-1));
  }

  //To open Edit Contact Form
  openEdit(content:FormGroup,contact:Contact){
    this.modalService.open(content,{ariaLabelledBy:'modal-basic-title2'}).result.then( 
      result => { this.closeResult = `Closed with: ${result}`; }
    );
    this.editContactForm = new FormGroup({
      fname:new FormControl(contact.fname,Validators.required),
      lname:new FormControl(contact.lname,Validators.required),
      pnumber:new FormControl(contact.pnumber,[Validators.required,Validators.pattern('[0-9]{10}')])
    })
  }

  //To Edit a Contact
  onSubmitEdit(c:Contact){
    console.log(c);
    for(var i in this.co){
      if(this.co[i].fname==c.fname || this.co[i].lname==c.lname || this.co[i].pnumber==c.pnumber){
        this.co[i] = c;
        break;
      }
    }
    alert('Contact Edited Successfully!');
    this.modalService.dismissAll();
    this.co.sort((a,b) => (a.fname>b.fname?1:-1));
  }

  //To Delete a Contact
  delete(contact:Contact)
  {
    console.log(this.co.indexOf(contact));
    this.co.splice(this.co.indexOf(contact),1);
  }

  //To display a phone number in a specific format
  showphone(contact:Contact)
  {
    this.str = contact.pnumber.toString();
    return (this.str.substring(0,3) + "-" + this.str.substring(3,6) + "-" + this.str.substring(6));
  } 
}
