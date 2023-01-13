import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { chevronDownCircle, options, alert, logOutOutline } from 'ionicons/icons';

import { Geolocation } from '@capacitor/geolocation';
import { Stepcounter } from '@ionic-native/stepcounter';

import './Profil.css';
import { useHistory } from 'react-router-dom';
import { resolve } from 'dns';

const Profil: React.FC = () => {

    const [items, setItems] = useState<string[]>([]);
    const [showModalClassement, setShowModalClassement] = useState(false);
    const [showModalOptions, setShowModalOptions] = useState(false);
    const [showModalDenonciation, setShowModalDenonciation] = useState(false);
    const [showModalConnection, setShowModalConnection] = useState(false);
    const [userData, setUserData] = useState(null);
    const [citizenList, setCitizenList] = useState<any[]>([])
    const [personTarget, setPersonTarget] = useState("");
    const [reason, setReason] = useState("");
    const history = useHistory();
    var actualCoord: { latitude: number; longitude: number; accuracy: number; altitudeAccuracy: number | null | undefined; altitude: number | null; speed: number | null; heading: number | null; } | null = null;

    const token = history.location.state
    var statusResponse = 0;
    const [step, setStepCounter] = useState(0);

    const setupCoord = async () => {
        var actualCoord = await (await Geolocation.getCurrentPosition()).coords;
        while(!actualCoord){

        }
        fetch('https://intensif06.ensicaen.fr/api/me/localisation', {
            method: 'POST',
            headers: { "Authorization": "Bearer " + token , 'Content-type': 'application/json; charset=UTF-8'},
            body: JSON.stringify({
                latitude: actualCoord.latitude,
                longitude: actualCoord.longitude,
            })
        })
    };

    const printCurrentPosition = async () => {
        if(actualCoord){
            console.log(123456);
        }
    };

    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 50; i++) {
            newItems.push(`Item ${1 + items.length + i}`);
        }
        setItems([...items, ...newItems]);
    };

    const setupStep = async () => {
        Stepcounter.start(1);
        setStepCounter(await Stepcounter.getStepCount());
        console.log(await Stepcounter.getTodayStepCount());
        console.log(await Stepcounter.deviceCanCountSteps());
    }

    const updateStep = async () => {
        setStepCounter(await Stepcounter.getStepCount() + step);
        console.log(step);
        console.log(await Stepcounter.getHistory());
    }

    useEffect(() => {
        generateItems();

        setupStep();
        setupCoord();     
        printCurrentPosition();     

        fetch('https://intensif06.ensicaen.fr/api/me/', {
            method: 'GET',
            headers: { "Authorization": "Bearer " + token }
        }).then(function (response) {
            statusResponse = response.status;
            return response.json();
        })
            .then(function (data) {
                if (statusResponse == 200) {
                    setUserData(data)
                } else {
                    history.replace("/home")
                }
            })

        fetch('https://intensif06.ensicaen.fr/api/people/', {
            method: 'GET',
        }).then(function (response) {
            statusResponse = response.status;
            return response.json();
        })
            .then(function (data) {
                setCitizenList(data);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleInputTarget(event: { target: any; }) {
        setPersonTarget(event.target.value);
    }

    function handleInputReason(event: { target: any; }) {
        setReason(event.target.value);
    }

    const report = () => {
        //marche pas
        fetch('https://intensif06.ensicaen.fr/api/report/', {
            method: 'POST',
            headers: { "Authorization": "Bearer " + token },
            body: JSON.stringify({
                idPersonTarget: personTarget,
                reason: reason,
            })
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton />
                    </IonButtons>
                    <IonTitle>Profil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>

                <IonFab slot="fixed" vertical="top" horizontal="end" edge={true}>
                    <IonFabButton>
                        <IonIcon icon={chevronDownCircle}></IonIcon>
                    </IonFabButton>
                    <IonFabList side="bottom">
                        <IonFabButton onClick={() => {setShowModalOptions(true); updateStep()}}>
                            <IonIcon icon={options}></IonIcon>
                        </IonFabButton>
                        <IonFabButton onClick={() => setShowModalDenonciation(true)}>
                            <IonIcon icon={alert}></IonIcon>
                        </IonFabButton>
                        <IonFabButton onClick={() => history.replace('/home')}>
                            <IonIcon icon={logOutOutline}></IonIcon>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>

                <div className="profil-content">
                    <IonAvatar class="center profil-photo">
                        <img src={userData != null ? "https://intensif06.ensicaen.fr/api/uploads/" + userData["photo"] : "https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"} />
                    </IonAvatar>

                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>{userData != null ? userData["firstNames"] + " " + userData["lastName"] : "Prénom Nom"}</IonCardTitle>
                            <IonCardSubtitle>Habitant à {userData != null ? userData["address"] + ", " + userData["city"] + ", " + userData["country"] : "Pays"} </IonCardSubtitle>
                            <IonCardSubtitle>Travaillant à {userData != null ? userData["companyName"] : "Travail"}</IonCardSubtitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <IonCard>
                                <IonCardContent>
                                    CSSE : 234
                                </IonCardContent>
                                <IonCardContent>
                                    Classement : 5231
                                </IonCardContent>
                                <IonCardContent>
                                    Nombre de pas : {step}
                                </IonCardContent>
                            </IonCard>
                        </IonCardContent>

                        <IonModal isOpen={showModalOptions}
                            onDidDismiss={() => setShowModalOptions(false)} >
                            <div className="modal">
                                <IonTitle>Options</IonTitle>
                                <IonButton class="modal-button" onClick={() => setShowModalOptions(false)}>Fermer</IonButton>
                            </div>

                        </IonModal>

                        <IonModal isOpen={showModalConnection}
                            onDidDismiss={() => setShowModalConnection(false)} >
                            <div className="modal">
                                <IonTitle>Connection</IonTitle>
                                <IonButton class="modal-button" onClick={() => setShowModalConnection(false)}>Fermer</IonButton>
                            </div>
                            Scanner pour vous connecter
                        </IonModal>

                        <IonModal isOpen={showModalDenonciation}
                            onDidDismiss={() => setShowModalDenonciation(false)} >
                            <div className="modal">
                                <IonTitle>Reporter un problème</IonTitle>
                                <IonButton class="modal-button" onClick={() => setShowModalDenonciation(false)}>Fermer</IonButton>
                            </div>
                            <IonItem>
                                <IonLabel>Personne concernée :  </IonLabel>
                                <IonInput placeholder="Personne concernée..." onIonChange={handleInputTarget}></IonInput>
                            </IonItem>
                            <IonItem>
                                <IonLabel>Motif de la plainte :  </IonLabel>
                                <IonTextarea autoGrow={true} placeholder="Veuillez expliquer ce que vous avez vu..." onIonChange={handleInputReason}></IonTextarea>
                            </IonItem>

                            <IonButton class="validate" onClick={() => report()}>Valider</IonButton>
                        </IonModal>

                        <IonModal isOpen={showModalClassement}
                            onDidDismiss={() => setShowModalClassement(false)} >
                            <IonContent>
                                <div className="modal">
                                    <IonTitle>Classement</IonTitle>
                                    <IonButton class="modal-button" onClick={() => setShowModalClassement(false)}>Fermer</IonButton>
                                </div>
                                <IonList>
                                    {citizenList && citizenList.map((citizen: { [x: string]: string; }, index: any) => (
                                        <IonItem key={citizen["nationalId"]}>
                                            <IonAvatar slot="start">
                                                <img src={"https://intensif06.ensicaen.fr/api/uploads/" + citizen["photo"]} alt="avatar" />
                                            </IonAvatar>
                                            <IonLabel>{citizen["firstNames"] + " " + citizen["lastName"]}</IonLabel>
                                        </IonItem>
                                    ))}
                                </IonList>
                                <IonInfiniteScroll
                                    onIonInfinite={(ev) => {
                                        generateItems();
                                        setTimeout(() => ev.target.complete(), 500);
                                    }}
                                >
                                    <IonInfiniteScrollContent></IonInfiniteScrollContent>
                                </IonInfiniteScroll>
                            </IonContent>
                        </IonModal>

                        <IonButton onClick={() => setShowModalClassement(true)} class="btn btn-primary center-button">Classement</IonButton>
                        <IonButton onClick={() => setShowModalConnection(true)} class="btn btn-primary center-button">Connexion à un appareil</IonButton>

                    </IonCard>
                </div>
            </IonContent>
        </IonPage >
    );
};
export default Profil;
