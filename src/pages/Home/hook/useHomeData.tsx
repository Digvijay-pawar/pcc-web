import { useState, useEffect } from "react";
import type {
  Match,
  Tournament,
  City,
  Area,
  FilterOptions,
} from "../../../types/match.types";

const useHomeData = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterOptions>({
    city: "all",
    area: "all",
    dateFilter: "all",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const mockCities: City[] = [
      { id: "1", name: "Pune" },
      { id: "2", name: "Mumbai" },
      { id: "3", name: "Nagpur" },
    ];

    const mockAreas: Area[] = [
      { id: "1", name: "Kothrud", cityId: "1" },
      { id: "2", name: "Hinjewadi", cityId: "1" },
      { id: "3", name: "Baner", cityId: "1" },
      { id: "4", name: "Andheri", cityId: "2" },
      { id: "5", name: "Bandra", cityId: "2" },
    ];

    const mockMatches: Match[] = [
      {
        id: "1",
        title: "Evening Cricket Match",
        date: "2025-01-29",
        time: "18:00",
        venue: "Shivaji Stadium",
        city: "Pune",
        area: "Kothrud",
        maxPlayers: 16,
        joinedPlayers: 12,
        status: "upcoming",
        description: "Friendly evening match, all skill levels welcome",
      },
      {
        id: "2",
        title: "Weekend Cricket Game",
        date: "2025-01-30",
        time: "16:00",
        venue: "PYC Gymkhana",
        city: "Pune",
        area: "Baner",
        maxPlayers: 16,
        joinedPlayers: 16,
        status: "live",
        description: "Competitive match for experienced players",
      },
      {
        id: "3",
        title: "Morning Practice Match",
        date: "2025-01-28",
        time: "08:00",
        venue: "Deccan Ground",
        city: "Pune",
        area: "Deccan",
        maxPlayers: 20,
        joinedPlayers: 20,
        status: "completed",
        description: "Practice session completed",
      },
    ];

    const mockTournaments: Tournament[] = [
      {
        id: "1",
        name: "Pune Premier League 2025",
        startDate: "2025-01-25",
        endDate: "2025-02-15",
        city: "Pune",
        area: "All",
        status: "ongoing",
        totalMatches: 24,
        completedMatches: 8,
        description:
          "Annual cricket tournament featuring teams from across Pune",
      },
      {
        id: "2",
        name: "Mumbai Cricket Championship",
        startDate: "2025-01-20",
        endDate: "2025-02-10",
        city: "Mumbai",
        area: "All",
        status: "upcoming",
        totalMatches: 18,
        completedMatches: 12,
        description: "Monthly cricket championship for all skill levels",
      },
      {
        id: "2",
        name: "Mumbai Cricket Championship",
        startDate: "2025-01-20",
        endDate: "2025-02-10",
        city: "Mumbai",
        area: "All",
        status: "completed",
        totalMatches: 18,
        completedMatches: 12,
        description: "Monthly cricket championship for all skill levels",
      },
    ];

    setCities(mockCities);
    setAreas(mockAreas);
    setMatches(mockMatches);
    setTournaments(mockTournaments);
    setLoading(false);
  };

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const getFilteredMatches = () => {
    return matches.filter((match) => {
      const cityMatch = filters.city === "all" || match.city === filters.city;
      const areaMatch = filters.area === "all" || match.area === filters.area;

      let dateMatch = true;
      const today = new Date().toISOString().split("T")[0];

      if (filters.dateFilter === "past") {
        dateMatch = match.date < today;
      } else if (filters.dateFilter === "today") {
        dateMatch = match.date === today;
      } else if (filters.dateFilter === "upcoming") {
        dateMatch = match.date > today;
      }

      return cityMatch && areaMatch && dateMatch;
    });
  };

  const getFilteredTournaments = () => {
    return tournaments.filter((tournament) => {
      const cityMatch =
        filters.city === "all" || tournament.city === filters.city;
      const areaMatch =
        filters.area === "all" ||
        tournament.area === "All" ||
        tournament.area === filters.area;
      return cityMatch && areaMatch;
    });
  };

  const getFilteredAreas = () => {
    if (filters.city === "all") return areas;
    return areas.filter(
      (area) => area.cityId === cities.find((c) => c.name === filters.city)?.id,
    );
  };

  return {
    matches: getFilteredMatches(),
    tournaments: getFilteredTournaments(),
    cities,
    areas: getFilteredAreas(),
    filters,
    updateFilter,
    loading,
  };
};

export default useHomeData;
