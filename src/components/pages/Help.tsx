import { Divider, List, Text, Title } from '@mantine/core'

const Help = () => {
    return (
        <>
            <Title order={1}>Käyttöohjeet</Title>
            <List>
                <List.Item>
                    Lisää tarvittavia kohteita (diagnoosit, hoidot jne.) painamalla sivupalkissa ko. osion kohdalla "+"-painiketta.
                </List.Item>
                <List.Item>
                    Avaa lisätyt kohteet klikkaamalla niitä sivupalkissa ja täytä tarvittavat tiedot avautuvaan
                    lomakkeeseen. Muista hyväksyä muutokset ikkunan alareunassa olevan painikkeen avulla!
                </List.Item>
                <List.Item>
                    Voit muuttaa listana olevien kohteiden järjestystä vetämällä ja pudottamalla; tarvittaessa
                    voit poistaa kohteita myös kokonaan painamalla roskakorikuviota.
                </List.Item>
                <List.Item>
                    Voit poistaa kaikki tiedot painamalla "Uusi".
                </List.Item>
                <List.Item>
                    Tallenna syötetyt tiedot omalle tietokoneelle json-tiedostona painamalla "Tallenna".
                </List.Item>
                <List.Item>
                    Aiemmin tallennettuja tiedostoja voi uudelleen avata painamalla "Lataa". Myös vanhalla yhteenvetosovelluksella
                    tehtyjä yhteenvetoja voi avata, mutta tietojen sijaintia kannattaa tuolloin tarkistaa ja tarvittaessa korjata.
                </List.Item>
                <List.Item>
                    Kun lomake on valmis, voit luoda siitä tulostettavan tiedoston painamalla "Luo Word-tiedosto".
                    Tässä vaiheessa sovellus kysyy potilaan henkilötietoja - nämä
                    eivät tallennu sovellukseen (eikä ladattavaan json-tiedostoon), vaan siirtyvät ainoastaan
                    Word-tiedostoon.
                </List.Item>
                <List.Item>
                    Hävitä ladattu Word-tiedosto tulostuksen jälkeen omalta tietokoneeltasi siinä olevien
                    henkilötietojen vuoksi.
                </List.Item>
            </List>
            <Title order={2} mt="xl">Tietoturva ja -suoja</Title>
            <Text>
                Tämä sovellus toimii kokonaan käyttäjän omassa selaimessa; mitään lomakkeisiin täytettyjä tietoja ei
                välitetä palvelimelle.
                Tallennettava json-tiedosto ei sisällä henkilötietoja, vaan niitä lisätään ainoastaan tulostettavaan,
                potilaalle annettavaan Word-tiedostoon.
                Tämän takia Word-tiedostoa ei pidä tallentaa omalle tietokoneelle, vaan tätä tulisi hävittää tulostuksen
                jälkeen.
            </Text>
            <Text mt="xl">Tätä sivua voit avata uudelleen painamalla yläpalkissa "?"-painiketta.</Text>
            <Divider my="xl" />
            <Title order={3} size="sm" mb="sm">Sovelluksen muutoshistoria</Title>
            <List size="xs">
                <List.Item>
                    1.0.2
                    <List withPadding size="xs">
                        <List.Item>
                            Lisätty ohje kemoterapia-sivulle, että soluhoitojen esihoitojen lääkkeet on syötettävä soluhoidon alle
                        </List.Item>
                        <List.Item>
                            Lisätty haittavaikutusten elinjärjestelmäluetteloon "Luuydin"
                        </List.Item>
                        <List.Item>
                            Sisäisiä muutoksia (mm. valikkovaihtoehtojen ja vakiotekstien sijainti)
                        </List.Item>
                    </List>
                </List.Item>
                <List.Item>
                    1.0.1
                    <List withPadding size="xs">
                        <List.Item>
                            Virheiden korjauksia
                        </List.Item>
                        <List.Item>
                            Lisätty ohje, että lääkkeiden nimiä on kirjoitettava oikein, jotta kumulatiivinen annoslasku toimii
                        </List.Item>
                    </List>
                </List.Item>
            </List>
        </>
    )
}

export default Help