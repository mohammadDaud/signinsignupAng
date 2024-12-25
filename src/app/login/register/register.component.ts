import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { AuthserviceService } from 'src/app/services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  error!: string;
  submitted = false;
  response!: string;
  countries: any = [];
  saudiState: any = [];
  tabukCities: any = [];
  jawfCities: any = [];
  madinahCities: any = [];
  mekkahCities: any = [];
  riyadhCities: any = [];
  dammamCities: any = [];
  dubaiCities: any = [];
  pakState: any = []; punjabCities: any = []; sindhCities: any = []; balochCities: any = []; pakhtoonCities: any = [];
  uaeState: any = []; ajmanCities: any = []; abudhabiCities: any = []; sharjahCities: any = []; qaiwanCities: any = []; khaimahCities: any = [];
  fujairahCities: any = []; jizanCities: any = [];
  ukState: any = [];
  englandCities: any = [];
  scotlandCities: any = [];
  walesCities: any = [];
  irelandCities: any = [];
  cityList: any = [];
  stateList: any = [];
  successMsg = false;
  signupFailed = false;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthserviceService,
    private logger:NGXLogger
  ) {
    this.countries = [
      { id: '692', name: 'Saudi Arabia' },
      { id: '586', name: 'Pakistan' },
      { id: '784', name: 'United Arab Emirates' },
    ],
      this.saudiState = [
        { id: 'tabuk', name: 'Tabuk' },
        { id: 'jawf', name: 'Al Jawf' },
        { id: 'madinah', name: 'Al Madinah' },
        { id: 'mekkah', name: 'Makkah' },
        { id: 'riyadh', name: 'Riyadh' },
      ],
      this.pakState = [
        { id: 'punjab', name: 'Punjab' },
        { id: 'sindh', name: 'Sindh' },
        { id: 'balochistan', name: 'Balochistan' },
        { id: 'pakhtun', name: 'Khyber Pakhtunkhwa' },
      ],
      this.uaeState = [
        { id: 'abudhabi', name: 'Abu Dhabi' },
        { id: 'sharjah', name: 'Sharjah' },
        { id: 'qaiwain', name: 'Umm al-Qaiwain' },
        { id: 'ajman', name: 'Ajman' },
        { id: 'khaimah', name: 'Ras Al Khaimah' },
        { id: 'fujairah', name: 'Fujairah' },
        { id: 'dubai', name: 'Dubai' },
      ],
      this.punjabCities = [
        { id: 'lahore', name: 'Lahore' },
        { id: 'islamabad', name: 'Islamabad' },
        { id: 'multan', name: 'Multan' },
        { id: 'sahiwal', name: 'Sahiwal' },
        { id: 'faisalabad', name: 'Faisalabad' },
        { id: 'gujranwala', name: 'Gujranwala' },
        { id: 'multan', name: 'Multan' },
        { id: 'bahawalpur', name: 'Bahawalpur' },
        { id: 'sargodha', name: 'Sargodha' },
        { id: 'sialkot', name: 'Sialkot' },
        { id: 'rahimyar', name: 'Rahim yar khan' },
        { id: 'gujrat', name: 'Gujrat' },
        { id: 'okara', name: 'Okara' },
        { id: 'kasur', name: 'Kasur' },
        { id: 'sadiqabad', name: 'Sadiqabad' },
        { id: 'khanpur', name: 'Khanpur' },
        { id: 'jhelum', name: 'Jhelum' },
        { id: 'gojra', name: 'Gojra' },
        { id: 'vehari', name: 'Vehari' },

      ],
      this.sindhCities = [
        { id: 'hyderabad', name: 'HyderAbad' },
        { id: 'karachi', name: 'Karachi' },
        { id: 'sukkur', name: 'Sukkur' },
        { id: 'nawabshah', name: 'Nawabshah' },
        { id: 'larkana', name: 'Larkana' },
        { id: 'kotri', name: 'Kotri' },
        { id: 'mirpur', name: 'Mirpur Khas' },
        { id: 'shikarpur', name: 'Shikarpur' },
        { id: 'dadu', name: 'Dadu' },
        { id: 'tandoadam', name: 'Tando Adam' },
        { id: 'umerkot', name: 'Umerkot' },
        { id: 'ghotki', name: 'Ghotki' },
        { id: 'rohri', name: 'Rohri' },
        { id: 'moro', name: 'Moro' },
        { id: 'badin', name: 'Badin' },
      ],
      this.balochCities = [
        { id: 'quetta', name: 'Quetta' },
        { id: 'gawadar', name: 'Gawadar' },
        { id: 'turbat', name: 'Turbat' },
        { id: 'sibbi', name: 'Sibbi' },
        { id: 'khuzdar', name: 'Khuzdar' },
        { id: 'hub', name: 'Hub' },
        { id: 'chaman', name: 'Chaman' },
        { id: 'allahyar', name: 'Dera Allah Yar' },
        { id: 'qalat', name: 'Qalat' },
        { id: 'sui', name: 'Sui Town' },
        { id: 'chitkan', name: 'Chitkan' },
        { id: 'zehri', name: 'Zehri' },
        { id: 'khanozai', name: 'Khanozai' },
        { id: 'harnai', name: 'Harnai' },
        { id: 'ormara', name: 'Ormara' },
      ],
      this.pakhtoonCities = [
        { id: 'peshawar', name: 'Peshawar' },
        { id: 'abbotabad', name: 'Abbotabad' },
        { id: 'mardan', name: 'Mardan' },
        { id: 'kohat', name: 'Kohat' },
        { id: 'deraismailkhan', name: 'Dera Ismail Khan' },
        { id: 'mansehra', name: 'Mansehra' },
        { id: 'swabi', name: 'Swabi' },
        { id: 'nowshera', name: 'Nowshera' },
        { id: 'swabi', name: 'Swabi' },
        { id: 'kabal', name: 'Kabal' },
        { id: 'barikot', name: 'Barikot' },
        { id: 'akorakhattak', name: 'Akora Khattak' },
        { id: 'tangi', name: 'Tangi' },
        { id: 'chitral', name: 'Chitral' },
        { id: 'karak', name: 'Karak' },
        { id: 'bannu', name: 'Bannu' },
        { id: 'lakki', name: 'Lakki Marwat' },
        { id: 'haripur', name: 'Haripur' },
        { id: 'jamurd', name: 'Jamurd' },
        { id: 'takhtibahi', name: 'Takht-i-Bahi' },
        { id: 'bahrain', name: 'Bahrain' },
      ],
      this.englandCities = [
        { id: 'london', name: 'London' },
        { id: 'manchester', name: 'Manchester' },
        { id: 'liverpool', name: 'Liverpool' },
        { id: 'birmingham', name: 'Birmingham' },
      ],
      this.scotlandCities = [
        { id: 'edinburgh', name: 'Edinburgh' },
        { id: 'glasgow', name: 'Glasgow' },
        { id: 'inverness', name: 'Inverness' },
        { id: 'perth', name: 'Perth' },
      ],
      this.walesCities = [
        { id: 'cardiff', name: 'Cardiff' },
        { id: 'swansea', name: 'Swansea' },
        { id: 'newport', name: 'Newport' },
        { id: 'bangor', name: 'Bangor' },
      ],
      this.irelandCities = [
        { id: 'dublin', name: 'Dublin' },
        { id: 'cork', name: 'Cork' },
        { id: 'galway', name: 'Galway' },
        { id: 'limerick', name: 'Limerick' },
      ],
      this.tabukCities = [
        { id: 'tejma', name: 'Tejma' },
        { id: 'wejh', name: 'Wejh' },
        { id: 'salama', name: 'Abu Salama' },
        { id: 'khuraybah', name: 'Al Khuraybah' },
        { id: 'duba', name: 'Duba' },
        { id: 'tabuk', name: 'Tabuk' },
        { id: 'tayma', name: 'Tayma' },
        { id: 'umluj', name: 'Umluj' },
        { id: 'haql', name: 'Haql' },
      ],
      this.jawfCities = [
        { id: 'sakaka', name: 'Sakaka' },
        { id: 'tubarjal', name: 'Tubarjal' },
        { id: 'hadban', name: 'Hadban' },
        { id: 'jandal', name: 'Dumah Al Jandal' },
      ],
      this.madinahCities = [
        { id: 'khaybar', name: 'Khaybar' },
        { id: 'badr', name: 'Badr' },
        { id: 'ais', name: 'Al-Ais' },
        { id: 'bahr', name: 'Yanbu Al Bahr' },
        { id: 'madinah', name: 'Madinah' },
        { id: 'mahd', name: 'Mahd' },
        { id: 'henakiyah', name: 'Henakiyah' },
      ],
      this.mekkahCities = [
        { id: 'jeddah', name: 'Jeddah' },
        { id: 'mekkah', name: 'Makkah' },
        { id: 'taif', name: 'Taif' },
        { id: 'jumum', name: 'Jumum' },
        { id: 'rabigh', name: 'Rabigh' },
        { id: 'kamil', name: 'Kamil' },
        { id: 'turbah', name: 'Turbah' },
        { id: 'ranyah', name: 'Ranyah' },
        { id: 'khulays', name: 'Khulays' },
      ],
      this.riyadhCities = [
        { id: 'riyadh', name: 'Riyadh' },
        { id: 'kharj', name: 'Kharj' },
        { id: 'majmaah', name: 'Majmaah' },
        { id: 'dawasir', name: 'Wadi ad-Dawasir' },
        { id: 'duwaidmi', name: 'Duwaidmi' },
        { id: 'hariq', name: 'Hariq' },
        { id: 'aflaj', name: 'Aflaj' },
        { id: 'afif', name: 'Afif' },
        { id: 'sulayyil', name: 'Sulayyil' },
        { id: 'rumah', name: 'Rumah' },
        { id: 'ghat', name: 'Ghat' },
      ],
      this.dammamCities = [
        { id: 'ahsa', name: 'Ahsa' },
        { id: 'jubail', name: 'Jubail' },
        { id: 'dammam', name: 'Dammam' },
        { id: 'khobar', name: 'Khobar' },
        { id: 'khafji', name: 'Khafji' },
        { id: 'hafr', name: 'Hafr al-Batin' },
        { id: 'buqayq', name: 'Buqayq' },
        { id: 'nairiya', name: 'Nairiyah' },
        { id: 'ras', name: 'Ras Tanura' },
        { id: 'qatif', name: 'Qatif' },
      ],
      this.jizanCities = [
        { id: 'bish', name: 'Bish' },
        { id: 'zabyah', name: 'Zabyah' },
        { id: 'sabya', name: 'Sabya' },
        { id: 'farasan', name: 'Farasan' },
        { id: 'arish', name: 'Abu Arish' },
        { id: 'sadad', name: 'Sadad' },
        { id: 'sila', name: 'Abu as-Sila' },
        { id: 'darb', name: 'Ad-Darb' },
        { id: 'dayir', name: 'Ad-Dayir' },
        { id: 'masarihah', name: 'Masarihah' },
        { id: 'khadra', name: 'Khadra' },
        { id: 'ardah', name: 'Al-Ardah' },
        { id: 'kubah', name: 'Al-Kubah' },
        { id: 'jadi', name: 'Al-Jadi' },
        { id: 'luqiyah', name: 'Luqiyah' },
        { id: 'matan', name: 'Matan' },
        { id: 'rakubah', name: 'Rakubah' },
      ],
      this.ajmanCities = [
        { id: 'ezra', name: 'Al  Ezra' },
        { id: 'ajman', name: 'Al Ajman' },
        { id: 'qadasia', name: 'Al Qadasia' },
        { id: 'hazana', name: 'Al Hazana' },
      ],
      this.abudhabiCities = [
        { id: 'abudhabi', name: 'Abu Dhabi' },
        { id: 'liwa', name: 'Liwa' },
        { id: 'ruwais', name: 'Ruwais' },
        { id: 'ghyathi', name: 'Ghayathi' },
        { id: 'madinat zayed', name: 'Madinat Zayed' },
        { id: 'mirfa', name: 'Mirfa' },
        { id: 'sila', name: 'Sila' },
        { id: 'delma', name: 'Delma' },
      ],
      this.sharjahCities = [
        { id: 'sharjah', name: 'Al Sharjah' },
        { id: 'fakkan', name: 'Khor Fakkan' },
        { id: 'kalba', name: 'Kalba' },
        { id: 'ajman', name: 'Ajman' },
        { id: 'dhaid', name: 'Al Dhaid' },
      ],
      this.khaimahCities = [
        { id: 'dharbaniya', name: 'Ad Dharbaniya' },
        { id: 'adhan', name: 'Adhan' },
        { id: 'dharbaniyah', name: 'Dharbaniyah' },
        { id: 'adhin', name: 'Adhin' },
        { id: 'ajima', name: 'Ajima' },
        { id: 'fulayyah', name: 'Fulayyah' },
        { id: 'ghabah', name: 'Ghabah' },
        { id: 'hamra', name: 'Al Hamrah' },
        { id: 'hayir', name: 'Hayir' },
        { id: 'hayl', name: 'Hayl' },
        { id: 'jaddah', name: 'Jaddah' },
        { id: 'kharan', name: 'Kharan' },
        { id: 'khashfah', name: 'Khashfah' },
        { id: 'mataf', name: 'Mataf' },
        { id: 'naslah', name: 'Naslah' },

      ],
      this.fujairahCities = [
        { id: 'adgat', name: 'Adgat' },
        { id: 'afarah', name: 'Afarah' },
        { id: 'akamiya', name: 'Akamiyah' },
        { id: 'badiyah', name: 'Badiyah' },
        { id: 'bithnah', name: 'Bithnah' },
        { id: 'fujayrah', name: 'Fujayrah' },
        { id: 'fuqait', name: 'Fuqait' },
        { id: 'ghurfah', name: 'Ghurfah' },
        { id: 'halah', name: 'Halah' },
        { id: 'hayl', name: 'Hayl' },
        { id: 'khalabiya', name: 'Khalabiya' },
        { id: 'kubus', name: 'Kubus' },
        { id: 'manamah', name: 'Manamah' },
        { id: 'qurayyah', name: 'Qurayyah' },
        { id: 'uyaynah', name: 'Uyaynah' },
        { id: 'fudjayra', name: 'Fudjayra' },
        { id: 'al-rol', name: 'Al-Rol' },
        { id: 'bithnah', name: 'Bithnah' },
        { id: 'daba', name: 'Daba' },
        { id: 'madaq', name: 'Madaq' },
        { id: 'ramlah', name: 'Ramlah' },
        { id: 'marbad', name: 'Marbad' },
        { id: 'zubarah', name: 'Zubarah' },
      ],
      this.dubaiCities = [
        { id: 'ain', name: 'Al Ain' },
        { id: 'hatta', name: 'Hatta' },
        { id: 'jabel', name: 'Jabel Ali' },
        { id: 'dubai', name: 'City of Dubai' },
      ],
      this.qaiwanCities = [
        { id: 'abraq', name: 'Al Abraq' },
        { id: 'labsah', name: 'Al Labsah' },
        { id: 'hazaywah', name: 'Al Hazaywah' },
        { id: 'adhib', name: 'Al Adhib' },
        { id: 'ajman', name: 'Ajman' },
        { id: 'qawain', name: 'Um al Qawain' },
        { id: 'lazimah', name: 'Lazimah' },
        { id: 'hamriyah', name: 'Al Hamriyah' },
        { id: 'raffah', name: 'Raffah' },
        { id: 'hamidiyah', name: 'Hamidiyah' },
        { id: 'ujman', name: 'Ujman' },
        { id: 'jazirah', name: 'Al Jazirah al Hamra' },
      ]
  }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("^[A-Za-z]*$")]],
      lastName: ['', [Validators.required, Validators.pattern("^[A-Za-z]*$")]],
      email: ['', [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]],
      password: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onCountryChange(e: any) {
    let country = e.value;
    this.logger.debug(e);
    if (country === '') {
      this.stateList = [];
    }
    else if (country === '692') {
      this.stateList = this.saudiState;
      this.logger.debug(this.cityList);
    }
    else if (country === '586') {
      this.stateList = this.pakState;
    }
    else if (country === '784') {
      this.stateList = this.uaeState;
    }

  }

  onStateChange(event: any) {
    let state = event.value;
    this.logger.debug(state);
    if (state === '') {
      this.cityList = [];
    }
    else if (state === 'tabuk') {
      this.cityList = this.tabukCities;
    }
    else if (state === 'jawf') {
      this.cityList = this.jawfCities;
    }
    else if (state === 'madinah') {
      this.cityList = this.madinahCities;
    }
    else if (state === 'mekkah') {
      this.cityList = this.mekkahCities;
    }
    else if (state === 'riyadh') {
      this.cityList = this.riyadhCities;
    }
    else if (state === 'jizzan') {
      this.cityList = this.jizanCities;
    }
    else if (state === 'punjab') {
      this.cityList = this.punjabCities;
    }
    else if (state === 'sindh') {
      this.cityList = this.sindhCities;
    }
    else if (state === 'balochistan') {
      this.cityList = this.balochCities;
    }
    else if (state === 'pakhtun') {
      this.cityList = this.pakhtoonCities;
    }
    else if (state === 'abudhabi') {
      this.cityList = this.abudhabiCities;
    }
    else if (state === 'khaimah') {
      this.cityList = this.khaimahCities;
    }
    else if (state === 'qaiwain') {
      this.cityList = this.qaiwanCities;
    }
    else if (state === 'ajman') {
      this.cityList = this.ajmanCities;
    }
    else if (state === 'fujairah') {
      this.cityList = this.fujairahCities;
    }
    else if (state === 'sharjah') {
      this.cityList = this.sharjahCities;
    }
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.signUp();
  }

  signUp() {
    this.auth.signUp(this.loginForm.value)
    .subscribe(data => {
      this.logger.debug("login.ts data  " +data.email);
          if (data) {
            this.router.navigate(['/login']);
        } 
      },
      error => {
        this.logger.debug('error',error)
        this.logger.debug(error.error.message);
        if(error.error.message)
        {
            this.error = error.error.message
        }
        else{
            this.error = error.error.errorDesc;
        }
      }
    );
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}
