declare namespace Employee {
  interface Infor {
    id: string;
    firstname: string;
    lastname: string;
    emailAddress: string;
    phoneNumber: string;
    gender: TGender;
  }

  interface PayloadSubmit {
    firstname: string;
    lastname: string;
    emailAddress: string;
    phoneNumber: string;
    gender: TGender;
  }

  interface EditParams {
    id: string
  }

  type TGender =
    | "Male"
    | "Female"
    | "Other";
}
