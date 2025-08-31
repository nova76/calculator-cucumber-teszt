# language: hu
Jellemző: Egyszerű számológép teszt
  Mint egy felhasználó
  Szeretnék egy egyszerű számológépet használni
  Hogy matematikai műveleteket hajthassak végre

  Háttér:
    Adott hogy megnyitottam a számológép alkalmazást

  Forgatókönyv: Egyszerű összeadás
    Adott hogy beírom az első számot: "10"
    És beírom a második számot: "5"
    Amikor rákattintok a "+" gombra
    Akkor az eredmény "10 + 5 = 15" lesz

  Forgatókönyv: Nullával való osztás hibakezelése
    Adott hogy beírom az első számot: "13"
    És beírom a második számot: "0"
    Amikor rákattintok a "÷" gombra
    Akkor hibaüzenetet kapok: "Nullával nem lehet osztani!"

  Forgatókönyv: Törlésfunkció
    Adott hogy beírom az első számot: "123"
    És beírom a második számot: "456"
    Amikor rákattintok a "Törlés" gombra
    Akkor mindkét mező üres lesz
    És az eredmény "Eredmény: -" lesz