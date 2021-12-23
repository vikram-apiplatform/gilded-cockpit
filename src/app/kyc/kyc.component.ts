import {Component, Inject, OnInit} from '@angular/core';
import {APIService} from '../api.service';
import {environment} from '../../environments/environment';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {LeftpanelComponent} from '../leftpanel/leftpanel.component';
import {RemediationsComponent} from '../remediations/remediations.component';
import {not} from 'rxjs/internal-compatibility';

@Component({
    selector: 'app-kyc',
    templateUrl: './kyc.component.html',
    styleUrls: ['./kyc.component.css']
})
export class KycComponent implements OnInit {

    kycDetails: any;
    kycHistory = {};
    showExpansionPanel = {};
    env = environment;
    statusChartData = [
        {
            name: 'Passed',
            value: 0,
            records: []
        },
        {
            name: 'Failed',
            value: 0,
            records: []
        },
        {
            name: 'Not attempted',
            value: 0,
            records: []
        }
    ];
    attemptsChartData = [
        {
            name: 'Attempts: 1',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 2',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 3',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 4',
            value: 0,
            records: []
        },
        {
            name: 'Attempts: 5',
            value: 0,
            records: []
        }
    ];
    statusChartHeader = 'KYC Status';
    attemptsChartHeader = 'No. Of Attempts';
    attemptsColorScheme = {
        domain: ['#ff6b6b', '#ff5252', '#ff3838', '#ff1f1f', '#ff0505']
    };
    isDataloading = true;
    showDrillDown = false;
    drillDownData: any;
    drillDownTitle = '';
    drillDownQueryParams = '';
    columns = ['account_no', 'full_name', 'email_id', 'mobile_no', 'country', 'is_kyc_verified', 'kyc_check_count'];
    kycHistoryColumns = ['date_created', 'last_updated', 'request_id', 'name', 'doc_type', 'reason', 'docInfo']

    constructor(public apiService: APIService, public dialog: MatDialog) {
    }

    ngOnInit() {

        let data = {
            'reason': 'Face Comparison Validation Failed',
            'last_updated': '2020-09-16T12:13:03',
            'date_created': '2020-09-16T12:12:56',
            'aml_response': null,
            'full_response': '{"DocumentSidesCode":1,"DocumentId":"580FF90062BF4F83AAFA42D39BFB197C","ProcessingRequest":{"ChipProcessingRequest":null,"PageProcessingRequests":[{"DataUnitProcessingRequests":[{"ImageIllumination":"Visible","DataUnitSize":3706474}]}],"DocumentProcessingParameters":{"IsFromCertifiedScanner":false,"IsToCheckAuthenticity":true,"ImageSource":"UncertifiedScanner","Tag":null,"IdentityDataInput":{"DateOfBirth":null,"PersonalNumber":null,"CountryIso3":null,"FirstName":"Shruthi","Gender":null,"LastName2":null,"DocumentNumber":null,"FirstName2":null,"DateOfIssue":null,"LastName":"Bhargav","NationalityIso3":null,"ResidentialAddress":null,"DateOfExpiry":null,"MiddleNames":null}},"CreationTime":"2020-09-16T16:12:39.92","DataVerificationRequest":null,"DocumentId":"580FF90062BF4F83AAFA42D39BFB197C","FaceComparisonRequest":{"RequestState":0,"ImageFileProcessingRequest":{"ImageIllumination":"Visible","DataUnitSize":861021}},"ProcessingHints":null,"ProofOfAddressRequest":null,"WorkerId":null},"SdrVersion":"20.9.0.4","IdentityDataInputStatus":1,"PageAsSeparateDocumentProcessingReports":[],"ProcessingDetails":{"ToleranceToRisk":0},"RiskManagementReport":null,"PassiveFaceLivenessDetectionReport":null,"ProcessingStartTime":"2020-09-16T16:12:42.22","CompletionStatus":"Ok","InternalData":{"Data3":"MTExMTE=","Data4":"MTEwMQ==","Data1":"eyJXYWl0VGltZUluTWlsbGlzZWNvbmRzIjoyMTEwfQ=="},"RequestRejectionInfo":null,"DocumentStatusReport2":{"ProcessingResultRemarks":[0,120],"PrimaryProcessingResult":0},"RequestAcceptanceWarnings":[],"PersonalInfoValidationReport":{"IsPersonalInfoValid":null,"PersonalInfoValidationTests":null},"ProcessingResult":{"DocumentPartImages":[{"ImageQuality":null,"ImageTypeCode":7,"ImageData":null,"SasToken":null},{"ImageQuality":{"IsGenerallyAcceptable":false},"ImageTypeCode":6,"ImageData":null,"SasToken":null}],"DocumentTypeDescriptor":{"YearOfIssue":null,"Alias":null,"CountryIso3":"IND","State":"","DocumentType":"ID Card","DocumentVersion":"V1"},"ForgeryTests":[{"ForgerySubtype":"Validation - Photo","ForgeryType":"Data Integrity","TestResult":"Authentic"},{"ForgerySubtype":"Validation - VIZ Date of Birth","ForgeryType":"Data Integrity","TestResult":"Authentic"},{"ForgerySubtype":"Photo Replacement","ForgeryType":"Digital","TestResult":"Authentic"},{"ForgerySubtype":"Photo Replacement - Sharp Edge","ForgeryType":"Digital","TestResult":"Authentic"},{"ForgerySubtype":"Text Replacement","ForgeryType":"Digital","TestResult":"Authentic"},{"ForgerySubtype":"Letter Case - VIZ Full Name","ForgeryType":"Structure","TestResult":"Authentic"},{"ForgerySubtype":"Text Alignment","ForgeryType":"Structure","TestResult":"Authentic"},{"ForgerySubtype":"VIZ Fonts - Alphabetic","ForgeryType":"Structure","TestResult":"Authentic"},{"ForgerySubtype":"VIZ Fonts - Digits","ForgeryType":"Structure","TestResult":"Authentic"}],"DocumentData2":{"DateOfBirth":{"BadValueDescriptor":null,"Value":"1986-05-28T00:00:00"},"SocialSecurityNumber":null,"Address":null,"ExtendedData":{"FirstNameToLatin":null,"PersonalNumber":null,"FirstNameLocal":null,"Authority":null,"FamilyName":null,"MiddleNameLocal":null,"IssuePlace":null,"MotherName":null,"VoterNumber":null,"Height":null,"Hair":null,"RegistryCode":null,"BirthplaceLocal":null,"LastNameLocal":null,"Eyes":null,"Employer":null,"MiddleNameToLatin":null,"Barcodes":[],"HusbandName":null,"Weight":null,"CalculatedAge":34,"VisaType":null,"DocumentDiscriminator":null,"Observations":null,"AuthorityLocal":null,"BloodType":null,"LastNameToLatin":null,"FatherName":{"LanguageCode":"eng","Value":"SOMASHEKAR DIXIT"}},"Birthplace":null,"FirstName":null,"LocalDateOfIssue":null,"Gender":null,"OptionalData":null,"DocumentNumber":{"LanguageCode":"eng","Value":"BMKPS3837E"},"MiddleName":null,"Nationality":null,"Mrz":null,"DateOfIssue":null,"FullName":{"LanguageCode":"eng","Value":"S SHRUTHI DIXIT"},"TaxIdNumber":null,"LastName":{"LanguageCode":"eng","Value":"S SHRUTHI DIXIT"},"VerifiedAddress":null,"DateOfExpiry":null},"ProcessedDocumentFeatures":"ImageUnderVisibleIllumination","SdrCompletionStatus":"Ok","IsDataExtracted":true,"OverallQuality":"NotAcceptable","IsDocumentExpired":null,"PageProcessingResults":[{"IsExpectedSecondSide":false,"ProcessedImages":[{"QualityBeforeAdjustment":{"IsAcceptableLayout":true,"IsAcceptableReflectionMrz":null,"IsAcceptableSize":true,"IsGenerallyAcceptable":false,"IsAcceptableDark":true,"IsAcceptableBlurViz":true,"IsAcceptableTextConfidenceViz":null,"IsAcceptableObliquity":true,"IsAcceptableEntropy":true,"IsAcceptableImageIncomplete":true,"IsAcceptableMrz":null,"IsAcceptableReflectionViz":false,"IsAcceptableDpi":true,"IsAcceptableBlurMrz":null,"IsAcceptableTextConfidenceMrz":null},"ImageCreationDateTime":null,"ReverseGeocodingReport":null,"CroppedHeight":4161,"IsColored":true,"ImageFileType":"jpg","FileName":"Front.VIS.jpg","IsValidSize":true,"Data":null,"Latitude":"","SoftwareUsed":"","Longitude":"","IsReduced":null,"ImageType":"Visible","OriginalWidth":4160,"CroppedWidth":3118,"Quality":{"IsAcceptableLayout":true,"IsAcceptableReflectionMrz":null,"IsAcceptableSize":true,"IsGenerallyAcceptable":false,"IsAcceptableDark":true,"IsAcceptableBlurViz":true,"IsAcceptableTextConfidenceViz":null,"IsAcceptableObliquity":true,"IsAcceptableEntropy":true,"IsAcceptableImageIncomplete":true,"IsAcceptableMrz":null,"IsAcceptableReflectionViz":false,"IsAcceptableDpi":true,"IsAcceptableBlurMrz":null,"IsAcceptableTextConfidenceMrz":null},"EquipmentMaker":"","OriginalHeight":3120,"SasToken":null,"EquipmentModel":""}],"CompletionStatus":"Ok","BarcodesProcessingReport":null,"IsSignature":true,"IdentityDataInputReport":{"ResidentialAddressSimilarityReport":{"AddressSimilarity":null,"AddressWordAverageSimilarity":null,"AddressWordSimilarityList":[],"AddressStatus":null},"FullNameSimilarity":50,"PersonalNumberSimilarity":null,"FullNameStatus":1,"DateOfBirthSimilarity":null,"DateOfIssueStatus":null,"PersonalNumberStatus":null,"DateOfBirthStatus":null,"DateOfExpiryStatus":null,"DateOfIssueSimilarity":null,"DocumentNumberStatus":null,"LastNameSimilarity":null,"CountryStatus":null,"FullNameSimilarityReport":{"FullNameSimilarity":50,"FullNameWordSimilarityListReverseLookup":[-1,100,0],"FullNameWordAverageSimilarity":50,"FullNameWordSimilarityList":[100,0],"FullNameStatus":1},"DateOfExpirySimilarity":null,"FirstNameSimilarity":null,"DocumentNumberSimilarity":null},"DurationInMilliseconds":12297}]},"ProofOfAddressReport":null,"DocumentScope":"IdentityDocuments","OptionalData":null,"FaceComparisonReport":{"ImageQuality":{"IsGenerallyAcceptable":true},"ReverseGeocodingReport":null,"FaceSimilarityRatio":6,"ImageMetadata":{"ImageCreationDateTime":null,"EquipmentMaker":"","FileName":null,"Latitude":"","SoftwareUsed":"","EquipmentModel":"","Longitude":""},"LivenessDetectionReport":null,"CompletionStatus":7,"FaceComparisonModelId":"1","ProcessedSupplementaryImageIndex":-1},"DocumentAuthenticity":"Authentic","DataAnalyticsReport":{"All":{"SeenThatImageTemplate":{"RepetitionDocInfo":[],"CountDay":0,"ConflictDocInfo":[],"IndConflict":false,"CountHour":0,"CountAll":0},"SeenThatDocumentNumber":{"RepetitionDocInfo":[],"CountDay":0,"ConflictDocInfo":[],"IndConflict":false,"CountHour":0,"CountAll":0},"SeenThatGeolocation":null,"SeenThatPerson":{"RepetitionDocInfo":[],"CountDay":0,"ConflictDocInfo":[],"IndConflict":false,"CountHour":0,"CountAll":0}},"MyOrganization":{"SeenThatImageTemplate":{"RepetitionDocInfo":[],"CountDay":0,"ConflictDocInfo":[],"IndConflict":false,"CountHour":0,"CountAll":0},"SeenThatDocumentNumber":{"RepetitionDocInfo":[],"CountDay":0,"ConflictDocInfo":[],"IndConflict":false,"CountHour":0,"CountAll":0},"SeenThatGeolocation":null,"SeenThatPerson":{"RepetitionDocInfo":[],"CountDay":0,"ConflictDocInfo":[],"IndConflict":false,"CountHour":0,"CountAll":0}}},"ProcessedSupplementaryImages":[],"CompletionTime":"2020-09-16T16:12:54.79"}',
            'required_response': '{"DocumentPartImages":[{"ImageQuality":null,"ImageTypeCode":7,"ImageData":null,"SasToken":null},{"ImageQuality":{"IsGenerallyAcceptable":false},"ImageTypeCode":6,"ImageData":null,"SasToken":null}],"DocumentTypeDescriptor":{"YearOfIssue":null,"Alias":null,"CountryIso3":"IND","State":"","DocumentType":"ID Card","DocumentVersion":"V1"},"ForgeryTests":[{"ForgerySubtype":"Validation - Photo","ForgeryType":"Data Integrity","TestResult":"Authentic"},{"ForgerySubtype":"Validation - VIZ Date of Birth","ForgeryType":"Data Integrity","TestResult":"Authentic"},{"ForgerySubtype":"Photo Replacement","ForgeryType":"Digital","TestResult":"Authentic"},{"ForgerySubtype":"Photo Replacement - Sharp Edge","ForgeryType":"Digital","TestResult":"Authentic"},{"ForgerySubtype":"Text Replacement","ForgeryType":"Digital","TestResult":"Authentic"},{"ForgerySubtype":"Letter Case - VIZ Full Name","ForgeryType":"Structure","TestResult":"Authentic"},{"ForgerySubtype":"Text Alignment","ForgeryType":"Structure","TestResult":"Authentic"},{"ForgerySubtype":"VIZ Fonts - Alphabetic","ForgeryType":"Structure","TestResult":"Authentic"},{"ForgerySubtype":"VIZ Fonts - Digits","ForgeryType":"Structure","TestResult":"Authentic"}],"DocumentData2":{"DateOfBirth":{"BadValueDescriptor":null,"Value":"1986-05-28T00:00:00"},"SocialSecurityNumber":null,"Address":null,"ExtendedData":{"FirstNameToLatin":null,"PersonalNumber":null,"FirstNameLocal":null,"Authority":null,"FamilyName":null,"MiddleNameLocal":null,"IssuePlace":null,"MotherName":null,"VoterNumber":null,"Height":null,"Hair":null,"RegistryCode":null,"BirthplaceLocal":null,"LastNameLocal":null,"Eyes":null,"Employer":null,"MiddleNameToLatin":null,"Barcodes":[],"HusbandName":null,"Weight":null,"CalculatedAge":34,"VisaType":null,"DocumentDiscriminator":null,"Observations":null,"AuthorityLocal":null,"BloodType":null,"LastNameToLatin":null,"FatherName":{"LanguageCode":"eng","Value":"SOMASHEKAR DIXIT"}},"Birthplace":null,"FirstName":null,"LocalDateOfIssue":null,"Gender":null,"OptionalData":null,"DocumentNumber":{"LanguageCode":"eng","Value":"BMKPS3837E"},"MiddleName":null,"Nationality":null,"Mrz":null,"DateOfIssue":null,"FullName":{"LanguageCode":"eng","Value":"S SHRUTHI DIXIT"},"TaxIdNumber":null,"LastName":{"LanguageCode":"eng","Value":"S SHRUTHI DIXIT"},"VerifiedAddress":null,"DateOfExpiry":null},"ProcessedDocumentFeatures":"ImageUnderVisibleIllumination","SdrCompletionStatus":"Ok","IsDataExtracted":true,"OverallQuality":"NotAcceptable","IsDocumentExpired":null,"PageProcessingResults":[{"IsExpectedSecondSide":false,"ProcessedImages":[{"QualityBeforeAdjustment":{"IsAcceptableLayout":true,"IsAcceptableReflectionMrz":null,"IsAcceptableSize":true,"IsGenerallyAcceptable":false,"IsAcceptableDark":true,"IsAcceptableBlurViz":true,"IsAcceptableTextConfidenceViz":null,"IsAcceptableObliquity":true,"IsAcceptableEntropy":true,"IsAcceptableImageIncomplete":true,"IsAcceptableMrz":null,"IsAcceptableReflectionViz":false,"IsAcceptableDpi":true,"IsAcceptableBlurMrz":null,"IsAcceptableTextConfidenceMrz":null},"ImageCreationDateTime":null,"ReverseGeocodingReport":null,"CroppedHeight":4161,"IsColored":true,"ImageFileType":"jpg","FileName":"Front.VIS.jpg","IsValidSize":true,"Data":null,"Latitude":"","SoftwareUsed":"","Longitude":"","IsReduced":null,"ImageType":"Visible","OriginalWidth":4160,"CroppedWidth":3118,"Quality":{"IsAcceptableLayout":true,"IsAcceptableReflectionMrz":null,"IsAcceptableSize":true,"IsGenerallyAcceptable":false,"IsAcceptableDark":true,"IsAcceptableBlurViz":true,"IsAcceptableTextConfidenceViz":null,"IsAcceptableObliquity":true,"IsAcceptableEntropy":true,"IsAcceptableImageIncomplete":true,"IsAcceptableMrz":null,"IsAcceptableReflectionViz":false,"IsAcceptableDpi":true,"IsAcceptableBlurMrz":null,"IsAcceptableTextConfidenceMrz":null},"EquipmentMaker":"","OriginalHeight":3120,"SasToken":null,"EquipmentModel":""}],"CompletionStatus":"Ok","BarcodesProcessingReport":null,"IsSignature":true,"IdentityDataInputReport":{"ResidentialAddressSimilarityReport":{"AddressSimilarity":null,"AddressWordAverageSimilarity":null,"AddressWordSimilarityList":[],"AddressStatus":null},"FullNameSimilarity":50,"PersonalNumberSimilarity":null,"FullNameStatus":1,"DateOfBirthSimilarity":null,"DateOfIssueStatus":null,"PersonalNumberStatus":null,"DateOfBirthStatus":null,"DateOfExpiryStatus":null,"DateOfIssueSimilarity":null,"DocumentNumberStatus":null,"LastNameSimilarity":null,"CountryStatus":null,"FullNameSimilarityReport":{"FullNameSimilarity":50,"FullNameWordSimilarityListReverseLookup":[-1,100,0],"FullNameWordAverageSimilarity":50,"FullNameWordSimilarityList":[100,0],"FullNameStatus":1},"DateOfExpirySimilarity":null,"FirstNameSimilarity":null,"DocumentNumberSimilarity":null},"DurationInMilliseconds":12297}]}',
            'doc_type': 'Pan card',
            'account_no': 'ACC_1600270829140',
            'user_id': 130,
            'name': 'Shruthi Bhargav',
            'id': 274,
            'filter_response': '{"completionStatus":"Ok","completionTime":"2020-09-16T16:12:54.79","documentAuthenticity":"Authentic","documentId":"580FF90062BF4F83AAFA42D39BFB197C","primaryProcessingResult":0,"processingResultRemarks":"[0,120]","faceSimilarityRatio":6.0,"isDocumentExpired":{},"alias":{},"countryIso3":"IND","documentType":"ID Card","documentVersion":"V1","state":"","yearOfIssue":{},"dateOfBirth":{},"calculatedAge":34}',
            'request_id': '580FF90062BF4F83AAFA42D39BFB197C',
            'double_check_response': null
        }

        this.drillDownData = [];
        this.getKYCStats();
        this.getKYC();
        // this.getKycHistory();
    }

    getKYCStats() {
        this.apiService.getKycSuccessCount().subscribe(response => {
            let successCount: any;
            successCount = response;
            if (successCount && successCount.length) {
                this.statusChartData[0].value = successCount[0].value;
            }
        })
        this.apiService.getKycFailedCount().subscribe(response => {
            let failedCount: any;
            failedCount = response;
            if (failedCount && failedCount.length) {
                this.statusChartData[1].value = failedCount[0].value;
            }
        })
        this.apiService.getKycNotAttemptedCount().subscribe(response => {
            let notAttemptedCount: any;
            notAttemptedCount = response;
            if (notAttemptedCount && notAttemptedCount.length) {
                this.statusChartData[2].value = notAttemptedCount[0].value;
            }
        })
        this.apiService.getKycAttemptsCount().subscribe(resp => {
            let attemptsCount: any;
            attemptsCount = resp;
            if (attemptsCount && attemptsCount.length) {
                this.attemptsChartData = [];
                for (const attempt of attemptsCount) {
                    this.attemptsChartData.push({name: attempt.kyc_check_count, value: attempt.users, records: []});
                }
            }
        })
    }

    getKYC() {
        this.apiService.getKYCDetails().subscribe(response => {
            this.kycDetails = response;
            //this.attemptsChartData = [];
            let attemptsData = {};
            // if (this.kycDetails && this.kycDetails.length) {
            //     for (const kyc of this.kycDetails) {
            //         switch (kyc.status) {
            //             case 'passed':
            //                 this.statusChartData[0].value += 1;
            //                 this.statusChartData[0].records.push(kyc);
            //                 this.statusChartData[0]['query'] = 'status=passed';
            //                 break;
            //             case 'failed':
            //                 this.statusChartData[1].value += 1;
            //                 this.statusChartData[1].records.push(kyc);
            //                 this.statusChartData[1]['query'] = 'status=failed';
            //                 break;
            //             case 'notAttempted':
            //                 this.statusChartData[2].value += 1;
            //                 this.statusChartData[2].records.push(kyc);
            //                 this.statusChartData[2]['query'] = 'status=notAttempted';
            //                 break;
            //         }
            //         if (kyc.status === 'failed') {
            //             switch (kyc.noOfAttempts) {
            //                 case 1:
            //                     this.attemptsChartData[0].value += 1;
            //                     this.attemptsChartData[0].records.push(kyc);
            //                     this.attemptsChartData[0]['query'] = 'noOfAttempts=1';
            //                     break;
            //                 case 2:
            //                     this.attemptsChartData[1].value += 1;
            //                     this.attemptsChartData[1].records.push(kyc);
            //                     this.attemptsChartData[1]['query'] = 'noOfAttempts=2';
            //                     break;
            //                 case 3:
            //                     this.attemptsChartData[2].value += 1;
            //                     this.attemptsChartData[2].records.push(kyc);
            //                     this.attemptsChartData[2]['query'] = 'noOfAttempts=3';
            //                     break;
            //                 case 4:
            //                     this.attemptsChartData[3].value += 1;
            //                     this.attemptsChartData[3].records.push(kyc);
            //                     this.attemptsChartData[3]['query'] = 'noOfAttempts=4';
            //                     break;
            //                 case 5:
            //                     this.attemptsChartData[4].value += 1;
            //                     this.attemptsChartData[4].records.push(kyc);
            //                     this.attemptsChartData[4]['query'] = 'noOfAttempts=5';
            //                     break;
            //             }
            //         }
            //     }
            //     this.isDataloading = false;
            // }

            if (this.kycDetails && this.kycDetails.length) {
                for (const kyc of this.kycDetails) {
                    // switch (kyc.is_kyc_verified) {
                    //     case true:
                    //         this.statusChartData[0].value += 1;
                    //         this.statusChartData[0].records.push(kyc);
                    //         this.statusChartData[0]['query'] = 'is_kyc_verified=true';
                    //         break;
                    //     case false:
                    //         if (kyc.kyc_check_count) {
                    //             this.statusChartData[1].value += 1;
                    //             this.statusChartData[1].records.push(kyc);
                    //             this.statusChartData[1]['query'] = 'is_kyc_verified=false';
                    //         } else {
                    //             this.statusChartData[2].value += 1;
                    //             this.statusChartData[2].records.push(kyc);
                    //             this.statusChartData[2]['query'] = 'is_kyc_verified=false&kyc_check_count=0';
                    //         }
                    //         break;
                    //     case 'passed':
                    //         this.statusChartData[0].value += 1;
                    //         this.statusChartData[0].records.push(kyc);
                    //         this.statusChartData[0]['query'] = 'status=passed';
                    //         break;
                    //     case 'failed':
                    //         this.statusChartData[1].value += 1;
                    //         this.statusChartData[1].records.push(kyc);
                    //         this.statusChartData[1]['query'] = 'status=failed';
                    //         break;
                    //     case 'notAttempted':
                    //         this.statusChartData[2].value += 1;
                    //         this.statusChartData[2].records.push(kyc);
                    //         this.statusChartData[2]['query'] = 'status=notAttempted';
                    //         break;
                    // }
                    if (kyc.is_kyc_verified === false) {
                        if (attemptsData && attemptsData[kyc.kyc_check_count]) {
                            attemptsData[kyc.kyc_check_count].value += 1;
                            attemptsData[kyc.kyc_check_count].records.push(kyc);
                        } else {
                            const tempObj = {
                                name: kyc.kyc_check_count,
                                value: 1,
                                records: [kyc],
                                query: 'kyc_check_count=' + kyc.kyc_check_count
                            }
                            attemptsData[kyc.kyc_check_count] = tempObj;
                        }
                        // switch (kyc.noOfAttempts) {
                        //     case 1:
                        //         this.attemptsChartData[0].value += 1;
                        //         this.attemptsChartData[0].records.push(kyc);
                        //         this.attemptsChartData[0]['query'] = 'noOfAttempts=1';
                        //         break;
                        //     case 2:
                        //         this.attemptsChartData[1].value += 1;
                        //         this.attemptsChartData[1].records.push(kyc);
                        //         this.attemptsChartData[1]['query'] = 'noOfAttempts=2';
                        //         break;
                        //     case 3:
                        //         this.attemptsChartData[2].value += 1;
                        //         this.attemptsChartData[2].records.push(kyc);
                        //         this.attemptsChartData[2]['query'] = 'noOfAttempts=3';
                        //         break;
                        //     case 4:
                        //         this.attemptsChartData[3].value += 1;
                        //         this.attemptsChartData[3].records.push(kyc);
                        //         this.attemptsChartData[3]['query'] = 'noOfAttempts=4';
                        //         break;
                        //     case 5:
                        //         this.attemptsChartData[4].value += 1;
                        //         this.attemptsChartData[4].records.push(kyc);
                        //         this.attemptsChartData[4]['query'] = 'noOfAttempts=5';
                        //         break;
                        // }
                    }
                    // if (attemptsData && Object.keys(attemptsData).length) {
                    //     for (const attemptsKey of Object.keys(attemptsData)) {
                    //         this.attemptsChartData.push(attemptsData[attemptsKey]);
                    //     }
                    // }
                    //
                    // this.attemptsChartData.sort((a, b) => {
                    //     if (a.name > b.name) {
                    //         return 1;
                    //     }
                    //     return -1;
                    // });
                }
                this.isDataloading = false;
            }
        })
    }

    sortArray(a, b, key) {
        if (a[key] < b[key]) {
            return 1;
        }
        return -1;
    }

    getKeys(obj) {
        return Object.keys(obj);
    }

    showDrillDownDetails(data) {
        this.showDrillDown = false;
        this.drillDownData = data.records;
        this.drillDownTitle = data.title;
        this.drillDownQueryParams = data.query;
        this.showDrillDown = true;
    }

    hideDrillDownDetails() {
        this.showDrillDown = false;
    }

    applyFilters(params) {
        const url = environment.kycUrl + params;
        this.apiService.getData(url).subscribe(response => {
            if (this.showDrillDown) {
                this.drillDownData = response;
            } else {
                this.kycDetails = response;
            }
        })
    }

    getKycHistory() {
        this.apiService.getKycHistory().subscribe(response => {
            let tempKycHhistory: any;
            tempKycHhistory = response;
            for (const kycHistory of tempKycHhistory) {
                if (this.kycHistory[kycHistory.account_no]) {
                    this.kycHistory[kycHistory.account_no].push(kycHistory);
                } else {
                    this.kycHistory[kycHistory.account_no] = [];
                    this.kycHistory[kycHistory.account_no].push(kycHistory);
                }
            }
        })
    }

    openExpandedTable(event) {
        const record = event.record;
        const index = event.index;
        if (!this.kycHistory[record.id]) {
            this.showExpansionPanel[index] = 'loading'
            this.apiService.getKycHistory('?user_id=' + record.id).subscribe(response => {
                let tempKycHistory: any;
                tempKycHistory = response;
                if (tempKycHistory && tempKycHistory.length) {
                    this.kycHistory[record.user_id] = [];
                    for (const kycHistory of tempKycHistory) {
                        if (this.kycHistory[kycHistory.user_id]) {
                            this.kycHistory[kycHistory.user_id].push(kycHistory);
                        } else {
                            this.kycHistory[kycHistory.user_id] = [];
                            this.kycHistory[kycHistory.user_id].push(kycHistory);
                        }
                    }
                    this.showExpansionPanel[index] = 'hide-btn'
                } else {
                    this.apiService.getKycResponseDetails('?user_id=' + record.id).subscribe(async resp => {
                        let tempResponseDetails: any;
                        tempResponseDetails = resp;
                        if (tempResponseDetails && tempResponseDetails.length) {

                            await Promise.all(tempResponseDetails.map(async (tempResponseDetail) => {
                                return new Promise(async (resolve, reject) => {
                                    this.apiService.getKycInfo('?request_id=' + tempResponseDetail.request_id).subscribe(res => {
                                        let tempKycInfo: any;
                                        tempKycInfo = res;
                                        tempResponseDetail['full_response'] = tempKycInfo[0].json_data;
                                        tempResponseDetail['name'] = record.full_name;
                                        tempResponseDetail['doc_type'] = tempKycInfo[0].json_data ? JSON.parse(tempKycInfo[0].json_data).original_kyc_info ? JSON.parse(tempKycInfo[0].json_data).original_kyc_info.doc_type : '' : '';
                                        if (this.kycHistory[tempResponseDetail.user_id]) {
                                            this.kycHistory[tempResponseDetail.user_id].push(tempResponseDetail);
                                        } else {
                                            this.kycHistory[tempResponseDetail.user_id] = [];
                                            this.kycHistory[tempResponseDetail.user_id].push(tempResponseDetail);
                                        }
                                        resolve('success');
                                    }, error => {
                                        resolve('success');
                                    })
                                });
                            })).then(async (results) => {
                                this.showExpansionPanel[index] = 'hide-btn';
                            });

                        } else {
                            this.showExpansionPanel[index] = 'hide-btn'
                        }
                    })
                }
            })
        } else {
            this.showExpansionPanel[index] = 'hide-btn'
        }
    }

    openDocumentViewer(doc) {
        const dialogRef = this.dialog.open(KycDocumentViewerComponent, {
            data: doc,
            width: '70%',
            height: '80%'
        })
    }

    openRemediations(record) {
        const dialogRef = this.dialog.open(RemediationsComponent, {
            data: record,
            width: '70%',
            height: '80%'
        })
    }

}


@Component({
    selector: 'app-kyc-document-viewer',
    templateUrl: './kycDocumentViewer.html',
    styleUrls: ['./kyc.component.css']
})
export class KycDocumentViewerComponent {

    docInfo: any;
    userInfo: any;
    photoInfo: any;
    verifiedAgentInfo: any;
    viewRawData = false;
    rawData: any;

    dataAvailable = false;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<KycDocumentViewerComponent>, public apiService: APIService) {
        dialogRef.disableClose = true;
        this.docInfo = JSON.parse(this.data.historyRecord.full_response);
        this.userInfo = this.docInfo.original_kyc_info;
        this.photoInfo = this.docInfo.photo;
        this.verifiedAgentInfo = this.docInfo.verified_agent;
        if (this.docInfo.original_kyc_info) {
            this.dataAvailable = true
        } else {
            this.viewRawData = true;
        }
        this.rawData = JSON.stringify(this.data.historyRecord);
        //this.getDocInfo();
    }

    getDocInfo() {
        this.apiService.getKycInfo('?request_id=' + this.data.historyRecord.request_id).subscribe(response => {
            this.docInfo = response;
            if (!this.docInfo || (this.docInfo && !this.docInfo.length)) {
                this.apiService.getKycInfo('?user_id=' + this.data.userRecord.id).subscribe(res => {
                    let info: any;
                    info = res;
                })
            }
        })
    }

    getImageSource(blob) {
        // return 'data:image/jpg;base64,' + Base64.encode(blob)
        return 'data:image/jpg;base64,' + blob;
    }

    toggleViewRawData() {
        this.viewRawData = !this.viewRawData;
    }

    close() {
        this.dialogRef.close();
    }
}
