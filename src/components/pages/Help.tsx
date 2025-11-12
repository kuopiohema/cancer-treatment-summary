import {List, ListItem, Text, Title} from '@mantine/core'

const Help = () => {
    return (
        <>
            <Title order={1}>Käyttöohjeet</Title>
            <List>
                <ListItem>Lisää tarvittavia kohteita (diagnoosit, hoidot jne.) painamalla sivupalkissa ko. osion kohdalla "+"-painiketta.</ListItem>
                <ListItem>Avaa lisätyt kohteet klikkaamalla niitä sivupalkissa ja täytä tarvittavat tiedot avautuvaan lomakkeeseen. Muista hyväksyä muutokset ikkunan alareunassa olevan painikkeen avulla!</ListItem>
                <ListItem>Voit muuttaa listana olevien kohteiden järjestystä vetämällä ja pudottamalla; tarvittaessa voit poistaa kohteita myös kokonaan painamalla roskakorikuviota.</ListItem>
                <ListItem>Voit poistaa kaikki tiedot painamalla "Uusi".</ListItem>
                <ListItem>Tallenna syötetyt tiedot omalle tietokoneelle json-tiedostona painamalla "Tallenna".</ListItem>
                <ListItem>Aiemmin tallennettuja tiedostoja voi uudelleen avata painamalla "Lataa". Huom: vanhalla yhteenvetosovelluksella tehtyjä tiedostoja ei toistaiseksi voi avata.</ListItem>
                <ListItem>Kun lomake on valmis, voit luoda siitä tulostettavan tiedoston painamalla "Luo Word-tiedosto". Tässä vaiheessa sovellus kysyy potilaan henkilötietoja - nämä
                eivät tallennu sovellukseen (eikä ladattavaan json-tiedostoon), vaan siirtyvät ainoastaan Word-tiedostoon.</ListItem>
                <ListItem>Hävitä ladattu Word-tiedosto tulostuksen jälkeen omalta tietokoneeltasi siinä olevien henkilötietojen vuoksi.</ListItem>
            </List>
            <Title order={2} mt="xl">Tietoturva ja -suoja</Title>
            <Text>
                Tämä sovellus toimii kokonaan käyttäjän omassa selaimessa; mitään lomakkeisiin täytettyjä tietoja ei välitetä palvelimelle.
                Tallennettava json-tiedosto ei sisällä henkilötietoja, vaan niitä lisätään ainoastaan tulostettavaan, potilaalle annettavaan Word-tiedostoon.
                Tämän takia Word-tiedostoa ei pidä tallentaa omalle tietokoneelle, vaan tätä tulisi hävittää tulostuksen jälkeen.
            </Text>
            <Text mt="xl">Tätä sivua voit avata uudelleen painamalla yläpalkissa "?"-painiketta.</Text>
        </>
    )
}

export default Help