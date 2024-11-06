import { useEffect, useState } from "react";

function useFetchData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = (author, limit) => {
    try {
      setLoading(true);
      let search = author.split(" ").join("+");
      const fetching = limit
        ? fetch(
            `https://openlibrary.org/search.json?q=${search}&limit=${limit}`
          )
        : fetch(`https://openlibrary.org/search.json?q=${search}`);

      fetching
        .then((response) => response.json())
        .then((data) => {
          const filteredData = data.docs
            .filter((item) => item.cover_edition_key)
            .map((item) => ({
              id: item.cover_edition_key,
              cover_edition_key: item.cover_edition_key,
              author_name: item.author_name ? item.author_name[0] : "N/A",
              title: item.title,
              publisher: item.publisher ? item.publisher[0] : "N/A",
            }));
          setData(filteredData);
          setLoading(false);
        });
    } catch {
      setLoading(false);
      throw new Error("Error while fetching data");
    }
  };
  useEffect(() => {
    fetchData("Sarah J Maas");
  }, []);

  return { data, loading, fetchData };
}

export default useFetchData;
