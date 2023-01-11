import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonFab, IonFabButton, IonFabList, IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent, IonItem, IonLabel, IonList, IonModal, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { chevronDownCircle, options, alert } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import './Profil.css';

const Profil: React.FC = () => {

    const [items, setItems] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <IonFabButton>
                            <IonIcon icon={options}></IonIcon>
                        </IonFabButton>
                        <IonFabButton>
                            <IonIcon icon={alert}></IonIcon>
                        </IonFabButton>
                    </IonFabList>
                </IonFab>

                <div className="profil-content">
                    <IonAvatar class="center profil-photo">
                        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y" />
                    </IonAvatar>

                    <IonCard>
                        <IonCardHeader>
                            <IonCardTitle>Nom Prénom</IonCardTitle>
                            <IonCardSubtitle>Attention</IonCardSubtitle>
                            <IonCardSubtitle>Vous n'avez pas atteint le seuil moyen</IonCardSubtitle>
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
                                    Nombre de pas : 4550
                                </IonCardContent>
                            </IonCard>
                        </IonCardContent>

                        <IonModal isOpen={showModal}
                            onDidDismiss={() => setShowModal(false)} >
                            <IonContent>
                                <div className="modal">
                                    <IonTitle>Classement</IonTitle>
                                    <IonButton class="modal-button" onClick={() => setShowModal(false)}>Fermer</IonButton>
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

                        <IonButton onClick={() => setShowModal(true)} class="btn btn-primary center-button">Classement</IonButton>
                    </IonCard>
                </div>
            </IonContent>
        </IonPage >
    );
};
export default Profil;
