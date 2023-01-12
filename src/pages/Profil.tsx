import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { chevronDownCircle, options, alert, logOutOutline } from 'ionicons/icons';

import { Geolocation } from '@capacitor/geolocation';
import { Stepcounter } from '@ionic-native/stepcounter';

import './Profil.css';
import { useHistory } from 'react-router-dom';

const Profil: React.FC = () => {

    const [items, setItems] = useState<string[]>([]);
    const [showModalClassement, setShowModalClassement] = useState(false);
    const [showModalOptions, setShowModalOptions] = useState(false);
    const [showModalDenonciation, setShowModalDenonciation] = useState(false);
    const [showModalConnection, setShowModalConnection] = useState(false);
    const [step, setStep] = useState(0);
    const [userData, setUserData] = useState(null);
    const [personTarget, setPersonTarget] = useState("");
    const [reason, setReason] = useState("");
    const history = useHistory();
    const token = history.location.state
    var statusResponse = 0;




    const printCurrentPosition = async () => {
        const coordinates = await Geolocation.getCurrentPosition();

        console.log('Current position:', coordinates);
    };

    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < 50; i++) {
            newItems.push(`Item ${1 + items.length + i}`);
        }
        setItems([...items, ...newItems]);
    };

    useEffect(() => {
        generateItems();
        printCurrentPosition();

        // Test stepcounter
        Stepcounter.start(0)
        var number = Stepcounter.getStepCount()
        console.log(number)

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


        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleInputTarget(event: { target: any; }) {
        setPersonTarget(event.target.value);
    }

    function handleInputReason(event: { target: any; }) {
        setReason(event.target.value);
    }

    const report = () => {
        fetch('http://192.168.3.111:3000/api/report/', {
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
                        <IonFabButton onClick={() => setShowModalOptions(true)}>
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
                                    Nombre de pas : {+ Stepcounter.getStepCount()}
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
                                    {items.map((item, index) => (
                                        <IonItem key={item}>
                                            <IonAvatar slot="start">
                                                <img src={'https://picsum.photos/80/80?random=' + index} alt="avatar" />
                                            </IonAvatar>
                                            <IonLabel>{item}</IonLabel>
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
