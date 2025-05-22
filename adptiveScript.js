var localUser;
var localUserList;
var fedUser;
var assocUser;

var onLoginRequest = function (context) {
  executeStep(1, {
    onFail: function (context, data) {
      // Get the username from the request parameters
      var selectedUser = context.request.params.username[0];
      Log.info(
        "============== Fail-1: Local User Selected. UserName: " + selectedUser
      );

      var claimMap = {};
      claimMap["http://wso2.org/claims/username"] = "PRIMARY/" + selectedUser;

      // Get a local user with the username
      localUser = getUniqueUserWithClaimValues(claimMap, context);
      // Check if localuser exists

      if (localUser) {
        // Check if the userType matches the specific one (userType)
        var userType = localUser.localClaims["http://wso2.org/claims/userType"];

        // Send error message for expired password
        if (userType === "in") {
          Log.info(
            "============== Fail-2: Password expired for user : " + selectedUser
          );
          sendError(null, {
            status: "Unauthorized",
            statusMsg:
              "Login failed. Your password expired. Please reset your password using the forgot password option.",
            i18nkey: "password.expired.error",
          });
        }
      }
    },

    onSuccess: function (context) {
      if (!(context.steps[1].idp == "LOCAL")) {
        // Get the federated user from context.
        fedUser = context.currentKnownSubject;
        //countryList Mapping for UAE PASS countries and ISO 2 Letter country format
        var countryList = {
          AND: "Andorra",
          ARE: "United Arab Emirates",
          AFG: "Afghanistan",
          ATG: "Antigua & Barbuda",
          AIA: "Anguilla",
          ALB: "Albania",
          ARM: "Armenia",
          AGO: "Angola",
          ATA: "Antarctica",
          ARG: "Argentina",
          ASM: "American Samoa",
          AUT: "Austria",
          AUS: "Australia",
          ABW: "Aruba",
          ALA: "Åland Islands",
          AZE: "Azerbaijan",
          BIH: "Bosnia & Herzegovina",
          BRB: "Barbados",
          BGD: "Bangladesh",
          BEL: "Belgium",
          BFA: "Burkina Faso",
          BGR: "Bulgaria",
          BHR: "Bahrain",
          BDI: "Burundi",
          BEN: "Benin",
          BLM: "St. Barthélemy",
          BMU: "Bermuda",
          BRN: "Brunei",
          BOL: "Bolivia",
          BES: "Caribbean Netherlands",
          BRA: "Brazil",
          BHS: "Bahamas",
          BTN: "Bhutan",
          BVT: "Bouvet Island",
          BWA: "Botswana",
          BLR: "Belarus",
          BLZ: "Belize",
          CAN: "Canada",
          CCK: "Cocos (Keeling) Islands",
          COD: "Congo - Kinshasa",
          CAF: "Central African Republic",
          COG: "Congo - Brazzaville",
          CHE: "Switzerland",
          CIV: "Côte d'Ivoire",
          COK: "Cook Islands",
          CHL: "Chile",
          CMR: "Cameroon",
          CHN: "China",
          COL: "Colombia",
          CRI: "Costa Rica",
          CUB: "Cuba",
          CPV: "Cape Verde",
          CUW: "Curaçao",
          CXR: "Christmas Island",
          CYP: "Cyprus",
          CZE: "Czechia",
          DEU: "Germany",
          DJI: "Djibouti",
          DNK: "Denmark",
          DMA: "Dominica",
          DOM: "Dominican Republic",
          DZA: "Algeria",
          ECU: "Ecuador",
          EST: "Estonia",
          EGY: "Egypt",
          ESH: "Western Sahara",
          ERI: "Eritrea",
          ESP: "Spain",
          ETH: "Ethiopia",
          FIN: "Finland",
          FJI: "Fiji",
          FLK: "Falkland Islands",
          FSM: "Micronesia",
          FRO: "Faroe Islands",
          FRA: "France",
          GAB: "Gabon",
          GBR: "United Kingdom",
          GRD: "Grenada",
          GEO: "Georgia",
          GUF: "French Guiana",
          GGY: "Guernsey",
          GHA: "Ghana",
          GIB: "Gibraltar",
          GRL: "Greenland",
          GMB: "Gambia",
          GIN: "Guinea",
          GLP: "Guadeloupe",
          GNQ: "Equatorial Guinea",
          GRC: "Greece",
          SGS: "South Georgia & South Sandwich Islands",
          GTM: "Guatemala",
          GUM: "Guam",
          GNB: "Guinea-Bissau",
          GUY: "Guyana",
          HKG: "Hong Kong SAR China",
          HMD: "Heard & McDonald Islands",
          HND: "Honduras",
          HRV: "Croatia",
          HTI: "Haiti",
          HUN: "Hungary",
          IDN: "Indonesia",
          IRL: "Ireland",
          ISR: "Israel",
          IMN: "Isle of Man",
          IND: "India",
          IOT: "British Indian Ocean Territory",
          IRQ: "Iraq",
          IRN: "Iran",
          ISL: "Iceland",
          ITA: "Italy",
          JEY: "Jersey",
          JAM: "Jamaica",
          JOR: "Jordan",
          JPN: "Japan",
          KEN: "Kenya",
          KGZ: "Kyrgyzstan",
          KHM: "Cambodia",
          KIR: "Kiribati",
          COM: "Comoros",
          KNA: "St. Kitts & Nevis",
          PRK: "North Korea",
          KOR: "South Korea",
          KWT: "Kuwait",
          CYM: "Cayman Islands",
          KAZ: "Kazakhstan",
          LAO: "Laos",
          LBN: "Lebanon",
          LCA: "St. Lucia",
          LIE: "Liechtenstein",
          LKA: "Sri Lanka",
          LBR: "Liberia",
          LSO: "Lesotho",
          LTU: "Lithuania",
          LUX: "Luxembourg",
          LVA: "Latvia",
          LBY: "Libya",
          MAR: "Morocco",
          MCO: "Monaco",
          MDA: "Moldova",
          MNE: "Montenegro",
          MAF: "St. Martin",
          MDG: "Madagascar",
          MHL: "Marshall Islands",
          MKD: "North Macedonia",
          MLI: "Mali",
          MMR: "Myanmar (Burma)",
          MNG: "Mongolia",
          MAC: "Macao SAR China",
          MNP: "Northern Mariana Islands",
          MTQ: "Martinique",
          MRT: "Mauritania",
          MSR: "Montserrat",
          MLT: "Malta",
          MUS: "Mauritius",
          MDV: "Maldives",
          MWI: "Malawi",
          MEX: "Mexico",
          MYS: "Malaysia",
          MOZ: "Mozambique",
          NAM: "Namibia",
          NCL: "New Caledonia",
          NER: "Niger",
          NFK: "Norfolk Island",
          NGA: "Nigeria",
          NIC: "Nicaragua",
          NLD: "Netherlands",
          NOR: "Norway",
          NPL: "Nepal",
          NRU: "Nauru",
          NIU: "Niue",
          NZL: "New Zealand",
          OMN: "Oman",
          PAN: "Panama",
          PER: "Peru",
          PYF: "French Polynesia",
          PNG: "Papua New Guinea",
          PHL: "Philippines",
          PAK: "Pakistan",
          POL: "Poland",
          SPM: "St. Pierre & Miquelon",
          PCN: "Pitcairn Islands",
          PRI: "Puerto Rico",
          PSE: "Palestinian Territories",
          PRT: "Portugal",
          PLW: "Palau",
          PRY: "Paraguay",
          QAT: "Qatar",
          REU: "Réunion",
          ROU: "Romania",
          SRB: "Serbia",
          RUS: "Russia",
          RWA: "Rwanda",
          SAU: "Saudi Arabia",
          SLB: "Solomon Islands",
          SYC: "Seychelles",
          SDN: "Sudan",
          SWE: "Sweden",
          SGP: "Singapore",
          SHN: "St. Helena",
          SVN: "Slovenia",
          SJM: "Svalbard & Jan Mayen",
          SVK: "Slovakia",
          SLE: "Sierra Leone",
          SMR: "San Marino",
          SEN: "Senegal",
          SOM: "Somalia",
          SUR: "Suriname",
          SSD: "South Sudan",
          STP: "São Tomé & Príncipe",
          SLV: "El Salvador",
          SXM: "Sint Maarten",
          SYR: "Syria",
          SWZ: "Eswatini",
          TCA: "Turks & Caicos Islands",
          TCD: "Chad",
          ATF: "French Southern Territories",
          TGO: "Togo",
          THA: "Thailand",
          TJK: "Tajikistan",
          TKL: "Tokelau",
          TLS: "Timor-Leste",
          TKM: "Turkmenistan",
          TUN: "Tunisia",
          TON: "Tonga",
          TUR: "Turkey",
          TTO: "Trinidad & Tobago",
          TUV: "Tuvalu",
          TWN: "Taiwan",
          TZA: "Tanzania",
          UKR: "Ukraine",
          UGA: "Uganda",
          UMI: "U.S. Outlying Islands",
          USA: "United States",
          URY: "Uruguay",
          UZB: "Uzbekistan",
          VAT: "Vatican City",
          VCT: "St. Vincent & Grenadines",
          VEN: "Venezuela",
          VGB: "British Virgin Islands",
          VIR: "U.S. Virgin Islands",
          VNM: "Vietnam",
          VUT: "Vanuatu",
          WLF: "Wallis & Futuna",
          WSM: "Samoa",
          YEM: "Yemen",
          MYT: "Mayotte",
          ZAF: "South Africa",
          ZMB: "Zambia",
          ZWE: "Zimbabwe",
        };
        Log.info("============== Step-1: Begin Post Auth Flow...");

        //Resolve Country
        if (
          fedUser.remoteClaims["nationalityEN"] != null &&
          countryList[fedUser.remoteClaims["nationalityEN"]] != null
        ) {
          fedUser.remoteClaims["country"] =
            countryList[fedUser.remoteClaims["nationalityEN"]];
          Log.info("============== Step-2: Country Cliam resolution done...");
        }
        // Resolve Mobile Number
        if (fedUser.remoteClaims["mobile"] != null) {
          var mobileNumber = fedUser.remoteClaims["mobile"];

          // Check if the mobile number starts with "+" and prepend it if not
          if (!mobileNumber.startsWith("+")) {
            mobileNumber = "+" + mobileNumber; // Prepend "+" if not already present
          }
          // Update the mobile number claim
          fedUser.remoteClaims["mobile"] = mobileNumber;

          Log.info(
            "============== Step-2.1: Mobile Number Claim resolution done..."
          );
        }

        // Get a local associated user for the federate user.
        assocUser = getAssociatedLocalUser(fedUser);
        Log.info("============== Step-3: Associated Local User Searching...");

        // Check if there is associated user available.
        if (assocUser == null) {
          // Local associated user is not available.
          Log.info("============== Step-4: Associated Local User is null.");
          //Create a claim mapping to get a user with email addresss.
          var claimMap = {};
          // if (fedUser.remoteClaims["uuid"] != null) {
          //   Log.info("uuid: " + fedUser.remoteClaims["uuid"]);
          //   claimMap["http://wso2.org/claims/uaepassId"] =
          //     "PRIMARY/" + fedUser.remoteClaims["uuid"];
          // }
          if (fedUser.remoteClaims["email"] != null) {
            Log.info("email: " + fedUser.remoteClaims["email"]);
            claimMap["http://wso2.org/claims/emailaddress"] =
              "PRIMARY/" + fedUser.remoteClaims["email"];

            // if (fedUser.remoteClaims["idn"] != null) {
            //   Log.info("idn: ");
            //   claimMap["http://wso2.org/claims/emiratesId"] =
            //     "PRIMARY/" + fedUser.remoteClaims["idn"];
            // }
            // if (fedUser.remoteClaims["mobile"] != null) {
            //   Log.info("mobile: " + fedUser.remoteClaims["mobile"]);
            //   claimMap["http://wso2.org/claims/mobile"] =
            //     "PRIMARY/" + fedUser.remoteClaims["mobile"];
            // }

            // Get a local user with the claims crieteria.

            localUserList = getUniqueUserWithClaimValues(claimMap, context);
            Log.info(
              "============== Step-5: Searching For Local Users with the uaepassId, email, emirateId and mobile in order."
            );

            Log.info(localUserList.claims["http://wso2.org/claims/username"]);
            Log.info(
              localUserList.localClaims["http://wso2.org/claims/username"]
            );

            if (localUserList) {
              Log.info("============== Step-6: multiple users found is ");
              Log.info(
                "============== Step-7: multiple users found length is " +
                  localUserList.length
              );

              if (localUserList) {
                Log.info("============== Step-8: Only single user found.");
                var claimMap = {};
                //user1 is the key for the first element of the list
                claimMap["http://wso2.org/claims/username"] =
                  "PRIMARY/" +
                  localUserList.claims["http://wso2.org/claims/username"];
                // Get a local user with the same email address sent from UAEPass.
                localUser = getUniqueUserWithClaimValues(claimMap, context);
                Log.info("============== Step-9: Fetching local user object.");

                var email = fedUser.remoteClaims["email"];
                var sp = context.serviceProviderName;
                var currentStep = context.steps[1];
                var idp = currentStep.idp;
                var createdTime =
                  localUser.claims["http://wso2.org/claims/created"];
                Log.info("User creation time: " + createdTime);

                var formattedCreatedTime = createdTime.split(".")[0] + "Z";

                Log.info(email);
                Log.info("sp: " + sp);
                // Log.info("currentstep: " + currentStep);
                Log.info("idp: " + idp);

                // Convert the creation time to a Date object
                var userCreationDate = new Date(formattedCreatedTime);
                Log.info("Parsed user creation date: " + userCreationDate);
                var timeDifferenceInMinutes;
                // Ensure the date is valid
                if (!isNaN(userCreationDate.getTime())) {
                  // Get the current time
                  var currentDate = new Date();
                  var timeDifference = currentDate - userCreationDate;

                  // Convert the time difference from milliseconds to minutes
                  timeDifferenceInMinutes = timeDifference / (1000 * 60);

                  Log.info(
                    "Time difference in minutes: " + timeDifferenceInMinutes
                  );
                }
                // Check if a local user available.
                if (localUser && timeDifferenceInMinutes >= 1) {
                  Log.info("============== Step-10: Local User Found.");
                  var username = localUser.username;

                  // Local user is available.
                  Log.info(
                    "============== Step-12: Local User found. UserName: " +
                      localUser.username
                  );

                  prompt(
                    "genericForm",
                    {
                      "username":username,
                      inputs: [
                          {
                            sp: sp,
                            accountType: idp,
                            email: email,
                            userName: username,
                          }
                      ],
                    },
                    {
                      onSuccess: function (context) {
                        var username = localUser.username;
                        var email = fedUser.remoteClaims["email"];
                        var sp = context.serviceProviderName;
                        var currentStep = context.steps[1];
                        var idp = currentStep.idp;

                        Log.info(
                            "==============  prompt succsess:  " + idp
                          );

                        var userStoreDomain = localUser.userStoreDomain;
                        // Associate local user with federated user.
                        doAssociationWithLocalUser(
                          fedUser,
                          localUser.username,
                          "carbon.super",
                          userStoreDomain
                        );
                        Log.info(
                          "============== Step-13: Asssociating with Found Local User..."
                        );

                        var currentSubject = context.currentKnownSubject;
                        currentSubject.username = localUser.username;
                        currentSubject.userStoreDomain = userStoreDomain;
                        currentSubject.claims[
                          "http://wso2.org/claims/username"
                        ] = localUser.username;
                        Log.info(
                          "============== Step-14: Associated local username: " +
                            localUser.username
                        );
                      },
                    }
                  );
                } else {
                  // No local user available. Continue to JIT provision.
                  Log.info("============== Step-17: Local user not founds");
                }
              } else if (localUserList.length > 1) {
                Log.info(
                  "============== Step-18: Prompting for end user to select the user to authenticate."
                );
                prompt(
                  "multipleAccountFound",
                  { inputs: localUserList },
                  {
                    onSuccess: function (context) {
                      var selectedUser = context.request.params.username[0];
                      Log.info(
                        "============== Step-19: Local User Selected. UserName: " +
                          selectedUser
                      );
                      var claimMap = {};
                      //user1 is the key for the first element of the list
                      claimMap["http://wso2.org/claims/username"] =
                        "PRIMARY/" + selectedUser;
                      // Get a local user with the same email address sent from UAEPass.
                      localUser = getUniqueUserWithClaimValues(
                        claimMap,
                        context
                      );
                      Log.info(
                        "============== Step-20: Fetching local user object."
                      );

                      var email = fedUser.remoteClaims["email"];
                      var sp = context.serviceProviderName;
                      var currentStep = context.steps[1];
                      var idp = currentStep.idp;

                      // Check if a local user available.
                      if (localUser) {
                        Log.info("============== Step-21: Local User Found.");
                        var username = localUser.username;
                        prompt(
                          "startAccountLink",
                          {
                            inputs: [
                              {
                                sp: sp,
                                accountType: idp,
                                email: email,
                                userName: username,
                              },
                            ],
                          },
                          {
                            onSuccess: function (context) {
                              var username = localUser.username;
                              var email = fedUser.remoteClaims["email"];
                              var sp = context.serviceProviderName;
                              var currentStep = context.steps[1];
                              var idp = currentStep.idp;
                              executeStep(
                                1,
                                {
                                  authenticationOptions: [
                                    { authenticator: "BasicAuthenticator" },
                                  ],
                                },
                                {
                                  onSuccess: function (context) {
                                    Log.info(
                                      "============== Step-22 PART B:Login with the basic authentication flow completed"
                                    );
                                  },
                                }
                              );
                              Log.info(
                                "============== Step-22: Finishing the consent flow on account linkning..."
                              );
                              prompt(
                                "finishAccountLink",
                                {
                                  inputs: [
                                    {
                                      sp: sp,
                                      accountType: idp,
                                      email: email,
                                      userName: username,
                                    },
                                  ],
                                },
                                {
                                  onSuccess: function (context) {
                                    // Local user is available.
                                    Log.info(
                                      "============== Step-23: Local User found. UserName: " +
                                        localUser.username
                                    );
                                    var userStoreDomain =
                                      localUser.userStoreDomain;
                                    // Associate local user with federated user.
                                    doAssociationWithLocalUser(
                                      fedUser,
                                      localUser.username,
                                      "carbon.super",
                                      userStoreDomain
                                    );
                                    Log.info(
                                      "============== Step-24: Asssociating with Found Local User..."
                                    );
                                    var currentSubject =
                                      context.currentKnownSubject;
                                    currentSubject.username =
                                      localUser.username;
                                    currentSubject.userStoreDomain =
                                      userStoreDomain;
                                    currentSubject.claims[
                                      "http://wso2.org/claims/username"
                                    ] = localUser.username;
                                    Log.info(
                                      "============== Step-25: Associated local username: " +
                                        localUser.username
                                    );
                                  },
                                  onFail: function (context, data) {
                                    Log.info(
                                      "============== Step-26: Error occurred while prompt - User Link Consent..."
                                    );
                                  },
                                }
                              );
                            },
                            onFail: function (context, data) {
                              Log.info(
                                "============== Step-27: Error occurred while prompt - User Link Consent..."
                              );
                            },
                          }
                        );
                      } else {
                        // No local user available. Continue to JIT provision.
                        Log.info(
                          "============== Step-28: Local user not founds"
                        );
                      }
                    },
                    onFail: function (context, data) {
                      Log.info(
                        "============== Step-29: Error occurred while prompt - User Link Consent..."
                      );
                    },
                  }
                );
              } else {
                Log.info(
                  "============== Step-30: Did not found any local users for the claim set..."
                );
              }
            }
          } else {
            Log.info(
              "========================================================================="
            );
            // Associated user available. Continue the flow.
            Log.info(
              "============== Step-31: Associated Local User Found UserName: " +
                assocUser.username
            );
          }
          // Get the associated Local User once again if the user associated with the above JS section
          var currentSubject = context.currentKnownSubject;
          var associatedLocalUser = getAssociatedLocalUser(currentSubject);
          if (associatedLocalUser == null) {
            Log.info("============== Step-32: associatedLocalUser is null");
          } else {
            var associatedLocalUser = getAssociatedLocalUser(currentSubject);
            currentSubject.claims["http://wso2.org/claims/username"] =
              associatedLocalUser.username;
            currentSubject.username = associatedLocalUser.username;
            Log.info(
              "============== Step-33: Setting the subjet claim: " +
                associatedLocalUser.username
            );
          }
        } else {
          // Basic Authentication Flow.
          Log.info(
            "============== Step-34:Login with the basic authentication flow."
          );
        }
      }
    },
  });
};
