export class UserDetails {
    constructor(
        //מזהה לקוח
        public IdUser: number = 0,
        //שם
        public UserName: string = "",
        //סיסמא
        public UserPassword: string = "",
        //הרשאת תזכורים
        public WantMemorandum: boolean = false,
        //אימייל
        public UserEmail: string = "",
        public DayBeforeMedsFinish: number = 0,
        public SubscriptionKey: string = ""
    ) { }
}
