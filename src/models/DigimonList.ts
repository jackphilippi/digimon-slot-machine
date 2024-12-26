import EvolutionRequirements from "./EvolutionRequirements";
import { Digimon, DigimonName, Level, Type } from "./Digimon";

export const digimonList = [
    // Botamon
    new Digimon(
        DigimonName.Botamon,
        Level.Fresh,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Koromon, DigimonName.Sukamon]
    ),
    // Poyomon
    new Digimon(
        DigimonName.Poyomon,
        Level.Fresh,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Tokomon, DigimonName.Sukamon]
    ),
    // Punimon
    new Digimon(
        DigimonName.Punimon,
        Level.Fresh,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Tsunomon, DigimonName.Sukamon]
    ),
    // Yuramon
    new Digimon(
        DigimonName.Yuramon,
        Level.Fresh,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Tanemon, DigimonName.Sukamon]
    ),

    // Koromon
    new Digimon(
        DigimonName.Koromon,
        Level.InTraining,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Agumon, DigimonName.Gabumon, DigimonName.Kunemon, DigimonName.Sukamon]
    ),
    // Tanemon
    new Digimon(
        DigimonName.Tanemon,
        Level.InTraining,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Palmon, DigimonName.Betamon, DigimonName.Kunemon, DigimonName.Sukamon]
    ),
    // Tokomon
    new Digimon(
        DigimonName.Tokomon,
        Level.InTraining,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Patamon, DigimonName.Biyomon, DigimonName.Kunemon, DigimonName.Sukamon]
    ),
    // Tsunomon
    new Digimon(
        DigimonName.Tsunomon,
        Level.InTraining,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Elecmon, DigimonName.Penguinmon, DigimonName.Kunemon, DigimonName.Sukamon]
    ),
    
    // Agumon
    new Digimon(
        DigimonName.Agumon,
        Level.Rookie,
        Type.Vaccine,
        new EvolutionRequirements(10, 10, 1, 0, 0, 0, 0, 15, 0, 0, 0, 0, false, false), 
        [DigimonName.Greymon, DigimonName.Meramon, DigimonName.Birdramon, DigimonName.Centarumon, DigimonName.Monochromon, DigimonName.Tyrannomon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Koromon
    ),
    // Betamon
    new Digimon(
        DigimonName.Betamon,
        Level.Rookie,
        Type.Virus,
        new EvolutionRequirements(10, 10, 0, 1, 0, 0, 0, 15, 0, 0, 0, 0, false, false),
        [DigimonName.Seadramon, DigimonName.Whamon, DigimonName.Shellmon, DigimonName.Coelamon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Tanemon, 
    ),
    // Biyomon
    new Digimon(
        DigimonName.Biyomon,
        Level.Rookie,
        Type.Vaccine,
        new EvolutionRequirements(0, 10, 0, 1, 1, 0, 0, 15, 0, 0, 0, 0, false, false), 
        [DigimonName.Birdramon, DigimonName.Airdramon, DigimonName.Kokatorimon, DigimonName.Unimon, DigimonName.Kabuterimon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Tokomon
    ),
    // Elecmon
    new Digimon(
        DigimonName.Elecmon,
        Level.Rookie,
        Type.Data,
        new EvolutionRequirements(10, 0, 1, 0, 1, 0, 0, 15, 0, 0, 0, 0, false, false), 
        [DigimonName.Leomon, DigimonName.Angemon, DigimonName.Bakemon, DigimonName.Kokatorimon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Tsunomon
    ),
    // Gabumon
    new Digimon(
        DigimonName.Gabumon,
        Level.Rookie,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 1, 1, 1, 0, 15, 0, 0, 0, 0, false, false), 
        [DigimonName.Centarumon, DigimonName.Monochromon, DigimonName.Drimogemon, DigimonName.Tyrannomon, DigimonName.Ogremon, DigimonName.Garurumon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Koromon
    ),
    // Kunemon
    new Digimon(
        DigimonName.Kunemon,
        Level.Rookie,
        Type.Virus,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Bakemon, DigimonName.Kabuterimon, DigimonName.Kuwagamon, DigimonName.Vegiemon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon]
    ),
    // Palmon
    new Digimon(
        DigimonName.Palmon,
        Level.Rookie,
        Type.Vaccine,
        new EvolutionRequirements(0, 10, 0, 0, 1, 1, 0, 15, 0, 0, 0, 0, false, false), 
        [DigimonName.Kuwagamon, DigimonName.Vegiemon, DigimonName.Ninjamon, DigimonName.Whamon, DigimonName.Coelamon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Tanemon
    ),
    // Patamon
    new Digimon(
        DigimonName.Patamon,
        Level.Rookie,
        Type.Data,
        new EvolutionRequirements(10, 0, 1, 0, 0, 1, 0, 15, 0, 0, 0, 0, false, false), 
        [DigimonName.Drimogemon, DigimonName.Tyrannomon, DigimonName.Ogremon, DigimonName.Leomon, DigimonName.Angemon, DigimonName.Unimon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Tokomon
    ),
    // Penguinmon
    new Digimon(
        DigimonName.Penguinmon,
        Level.Rookie,
        Type.Data,
        new EvolutionRequirements(0, 10, 0, 1, 0, 1, 0, 15, 0, 0, 0, 0, false, false), 
        [DigimonName.Whamon, DigimonName.Shellmon, DigimonName.Garurumon, DigimonName.Frigimon, DigimonName.Mojyamon, DigimonName.Numemon, DigimonName.Nanimon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Tsunomon
    ),
    // Airdramon
    new Digimon(
        DigimonName.Airdramon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(0, 1000, 0, 0, 100, 100, 1, 30, 90, 0, 0, 35, true, false), 
        [DigimonName.Megadramon, DigimonName.Phoenixmon, DigimonName.Vademon, DigimonName.Sukamon],
    ),
    // Angemon
    new Digimon(
        DigimonName.Angemon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(0, 1000, 0, 0, 0, 100, 0, 20, 0, 0, 0, 35, true, false), 
        [DigimonName.Andromon, DigimonName.Phoenixmon, DigimonName.Devimon, DigimonName.Vademon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Patamon
    ),
    // Bakemon
    new Digimon(
        DigimonName.Bakemon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(0, 1000, 0, 0, 0, 0, 3, 20, 0, 50, 0, 28, false, false), 
        [DigimonName.SkullGreymon, DigimonName.Giromon, DigimonName.Vademon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Patamon
    ),
    // Birdramon
    new Digimon(
        DigimonName.Birdramon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(0, 0, 0, 0, 100, 0, 3, 20, 0, 0, 0, 35, false, false), 
        [DigimonName.Phoenixmon, DigimonName.Vademon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Biyomon
    ),
    // Centarumon
    new Digimon(
        DigimonName.Centarumon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 0, 0, 100, 3, 30, 60, 0, 0, 28, true, false), 
        [DigimonName.Andromon, DigimonName.Giromon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Coelamon
    new Digimon(
        DigimonName.Coelamon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(0, 0, 0, 100, 0, 0, 3, 30, 0, 0, 5, 35, false, true), 
        [DigimonName.MegaSeadramon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Devimon
    new Digimon(
        DigimonName.Devimon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.SkullGreymon, DigimonName.Megadramon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Drimogemon
    new Digimon(
        DigimonName.Drimogemon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(0, 0, 100, 0, 0, 0, 3, 40, 0, 50, 0, 28, false, false), 
        [DigimonName.MetalGreymon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Frigimon
    new Digimon(
        DigimonName.Frigimon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(0, 1000, 0, 0, 0, 100, 5, 30, 0, 50, 0, 28, true, false), 
        [DigimonName.MetalMamemon, DigimonName.Mamemon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Garurumon
    new Digimon(
        DigimonName.Garurumon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(0, 1000, 0, 0, 100, 0, 1, 30, 90, 0, 0, 28, true, false), 
        [DigimonName.SkullGreymon, DigimonName.MegaSeadramon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Greymon
    new Digimon(
        DigimonName.Greymon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(0, 0, 100, 100, 100, 100, 1, 30, 90, 0, 0, 35, true, false), 
        [DigimonName.MetalGreymon, DigimonName.SkullGreymon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Kabuterimon
    new Digimon(
        DigimonName.Kabuterimon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(1000, 1000, 100, 0, 100, 0, 1, 30, 0, 0, 0, 35, true, false), 
        [DigimonName.HKabuterimon, DigimonName.MetalMamemon, DigimonName.Vademon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Kunemon
    ),
    // Kokatorimon
    new Digimon(
        DigimonName.Kokatorimon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(1000, 0, 0, 0, 0, 0, 3, 30, 0, 0, 0, 28, false, false), 
        [DigimonName.Phoenixmon, DigimonName.Piximon, DigimonName.Vademon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Biyomon
    ),
    // Kuwagamon
    new Digimon(
        DigimonName.Kuwagamon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(1000, 1000, 100, 0, 100, 0, 5, 30, 0, 0, 0, 28, false, false), 
        [DigimonName.HKabuterimon, DigimonName.Piximon, DigimonName.Vademon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Kunemon // Requires 
    ),
    // Leomon
    new Digimon(
        DigimonName.Leomon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(0, 0, 100, 0, 100, 100, 1, 20, 0, 0, 10, 35, true, false), 
        [DigimonName.Andromon, DigimonName.Mamemon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Meramon
    new Digimon(
        DigimonName.Meramon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(0, 0, 100, 0, 0, 0, 5, 20, 0, 0, 10, 28, false, false), 
        [DigimonName.MetalGreymon, DigimonName.Andromon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Mojyamon
    new Digimon(
        DigimonName.Mojyamon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(1000, 0, 0, 0, 0, 0, 5, 20, 0, 0, 5, 28, false, true), 
        [DigimonName.SkullGreymon, DigimonName.Mamemon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Monochromon
    new Digimon(
        DigimonName.Monochromon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(1000, 0, 0, 100, 0, 100, 3, 40, 0, 0, 5, 35, true, true), 
        [DigimonName.MetalGreymon, DigimonName.MetalMamemon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Nanimon
    new Digimon(
        DigimonName.Nanimon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Digitamamon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Ninjamon
    new Digimon(
        DigimonName.Ninjamon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(0, 1000, 100, 0, 100, 0, 1, 10, 0, 0, 15, 35, true, false), 
        [DigimonName.Piximon, DigimonName.MetalMamemon, DigimonName.Mamemon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Numemon
    new Digimon(
        DigimonName.Numemon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Monzaemon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Ogremon
    new Digimon(
        DigimonName.Ogremon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(1000, 0, 100, 0, 0, 0, 5, 30, 0, 0, 15, 35, false, false), 
        [DigimonName.Andromon, DigimonName.Giromon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Seadramon
    new Digimon(
        DigimonName.Seadramon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(1000, 1000, 0, 0, 0, 0, 3, 30, 0, 0, 5, 28, false, true), 
        [DigimonName.Megadramon, DigimonName.MegaSeadramon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Shellmon
    new Digimon(
        DigimonName.Shellmon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(1000, 0, 0, 100, 0, 0, 5, 40, 0, 0, 0, 35, false, false), 
        [DigimonName.HKabuterimon, DigimonName.MegaSeadramon, DigimonName.Vademon, DigimonName.Sukamon],
        /* Bonus */ DigimonName.Betamon // Betamon requires the extra bonus stats
    ),
    // Sukamon
    new Digimon(
        DigimonName.Sukamon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        [DigimonName.Etemon, DigimonName.Vademon]
    ),
    // Tyrannomon
    new Digimon(
        DigimonName.Tyrannomon,
        Level.Champion,
        Type.Data,
        new EvolutionRequirements(1000, 0, 0, 100, 0, 0, 5, 30, 0, 0, 5, 28, true, true), 
        [DigimonName.MetalGreymon, DigimonName.Megadramon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Unimon
    new Digimon(
        DigimonName.Unimon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(1000, 0, 0, 0, 100, 0, 3, 30, 0, 0, 10, 35, true, false), 
        [DigimonName.Giromon, DigimonName.Phoenixmon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Vegiemon
    new Digimon(
        DigimonName.Vegiemon,
        Level.Champion,
        Type.Virus,
        new EvolutionRequirements(0, 1000, 0, 0, 0, 0, 5, 10, 0, 50, 0, 21, false, false), 
        [DigimonName.Piximon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    // Whamon
    new Digimon(
        DigimonName.Whamon,
        Level.Champion,
        Type.Vaccine,
        new EvolutionRequirements(1000, 0, 0, 0, 0, 100, 5, 40, 60, 0, 0, 28, true, false), 
        [DigimonName.MegaSeadramon, DigimonName.Mamemon, DigimonName.Vademon, DigimonName.Sukamon]
    ),
    
    // Andromon
    new Digimon(
        DigimonName.Andromon,
        Level.Ultimate,
        Type.Vaccine,
        new EvolutionRequirements(2000, 4000, 200, 400, 200, 400, 5, 40, 95, 0, 30, 30, true, false), 
        [DigimonName.Sukamon]
    ),
    // Digitamamon
    new Digimon(
        DigimonName.Digitamamon,
        Level.Ultimate,
        Type.Data,
        new EvolutionRequirements(3000, 3000, 400, 400, 400, 300, 0, 10, 0, 0, 100, 49, true, false), 
        [DigimonName.Sukamon]
    ),
    // Etemon
    new Digimon(
        DigimonName.Etemon,
        Level.Ultimate,
        Type.Virus,
        new EvolutionRequirements(2000, 3000, 400, 200, 400, 300, 0, 15, 0, 0, 50, 49, true, false), 
        []
    ),
    // Giromon
    new Digimon(
        DigimonName.Giromon,
        Level.Ultimate,
        Type.Vaccine,
        new EvolutionRequirements(0, 0, 400, 0, 300, 400, 15, 5, 0, 95, 100, 35, false, false), 
        [DigimonName.Sukamon]
    ),
    // HKabuterimon
    new Digimon(
        DigimonName.HKabuterimon,
        Level.Ultimate,
        Type.Data,
        new EvolutionRequirements(7000, 0, 400, 600, 400, 0, 5, 55, 0, 0, 0, 40, true, true), 
        [DigimonName.Sukamon]
    ),
    // Mamemon
    new Digimon(
        DigimonName.Mamemon,
        Level.Ultimate,
        Type.Data,
        new EvolutionRequirements(0, 0, 400, 300, 300, 400, 15, 5, 0, 90, 0, 25, false, false), 
        [DigimonName.Sukamon]
    ),
    // Megadramon
    new Digimon(
        DigimonName.Megadramon,
        Level.Ultimate,
        Type.Virus,
        new EvolutionRequirements(3000, 5000, 500, 300, 400, 400, 10, 55, 0, 0, 30, 30, true, false), 
        [DigimonName.Sukamon]
    ),
    // MegaSeadramon
    new Digimon(
        DigimonName.MegaSeadramon,
        Level.Ultimate,
        Type.Data,
        new EvolutionRequirements(0, 4000, 500, 400, 0, 400, 5, 30, 0, 0, 0, 40, true, true), 
        [DigimonName.Sukamon]
    ),
    // MetalGreymon
    new Digimon(
        DigimonName.MetalGreymon,
        Level.Ultimate,
        Type.Virus,
        new EvolutionRequirements(4000, 3000, 500, 500, 300, 300, 10, 65, 95, 0, 30, 30, true, false), 
        [DigimonName.Sukamon]
    ),
    // MetalMamemon
    new Digimon(
        DigimonName.MetalMamemon,
        Level.Ultimate,
        Type.Data,
        new EvolutionRequirements(0, 0, 500, 400, 400, 400, 15, 10, 0, 95, 0, 30, true, false), 
        [DigimonName.Sukamon]
    ),
    // Monzaemon
    new Digimon(
        DigimonName.Monzaemon,
        Level.Ultimate,
        Type.Vaccine,
        new EvolutionRequirements(3000, 3000, 300, 300, 300, 300, 0, 40, 0, 0, 50, 49, true, false), 
        [DigimonName.Sukamon]
    ),
    // Phoenixmon
    new Digimon(
        DigimonName.Phoenixmon,
        Level.Ultimate,
        Type.Vaccine,
        new EvolutionRequirements(4000, 4000, 0, 0, 400, 600, 3, 30, 100, 0, 0, 40, true, true), 
        [DigimonName.Sukamon]
    ),
    // Piximon
    new Digimon(
        DigimonName.Piximon,
        Level.Ultimate,
        Type.Data,
        new EvolutionRequirements(0, 0, 300, 300, 400, 400, 15, 5, 0, 95, 0, 25, false, false), 
        [DigimonName.Sukamon]
    ),
    // SkullGreymon
    new Digimon(
        DigimonName.SkullGreymon,
        Level.Ultimate,
        Type.Virus,
        new EvolutionRequirements(4000, 6000, 400, 400, 200, 500, 10, 30, 0, 0, 40, 45, false, false), 
        [DigimonName.Sukamon]
    ),
    // Vademon
    new Digimon(
        DigimonName.Vademon,
        Level.Ultimate,
        Type.Virus,
        new EvolutionRequirements(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, false, false), 
        []
    ),
]

export function getDigimon(dn: DigimonName) { 
    return digimonList.find(d => d.name === dn) as Digimon;
}

export const getSpecialDigimonInfo = (dn: DigimonName) => {
    switch(dn) {
        case DigimonName.Devimon:
            return "Lose a battle with your Angemon while having less than 50% discipline and you'll have a chance to evolve into this digimon.";
        case DigimonName.Numemon:
            return "Make sure you don't meet the requirements for any other digimon and you'll evolve into this digimon after 96h (4 days) on the Rookie level.";
        case DigimonName.Sukamon:
            return "Fill your virus bar by allowing your digimon to poop on the ground.";
        case DigimonName.Nanimon:
            return "Bring happiness and discipline to 0 and scold your Digimon. The easiest way to do so is praising/scolding and then reducing the last bit of discipline by overfeeding. The fly/flower condition will increase your happiness and prevents you from getting this evolution.";
        case DigimonName.Vademon:
            return "Make sure you don't meet the requirements for any other digimon and you can evolve into this digimon when praising/scolding your Digimon after 240h (10 days) on the Champion level.";
        case DigimonName.Kunemon:
            return `Sleep in the "Kunemon's Bed" area and you'll have a chance to evolve into this digimon.`  
        default:
            return false;
    }
};
