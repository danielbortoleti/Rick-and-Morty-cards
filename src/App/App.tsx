import { useEffect, useState } from "react";
import { url } from "./services/api";
import { Container } from "./styled";
import { GlobalStyle } from "./styles/GlobalStyled";

export const App = () => {
  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    getPersonage();
  }, [response]);

  const getPersonage = async () => {
    try {
      const { data } = await url.get("/character");
      const { results } = data;
      if (results?.length > 0) {
        setResponse(results);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (err) {
      console.log("🚀 ~ file: App.tsx ~ line 11 ~ getPersonage ~ err", err);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          response?.map((data: any, index: number) => {
            return (
              <div key={index}>
                <h1>{data?.name}</h1>
                <img
                  src={data?.image}
                  alt={`${data?.name} pertence ao gender ${data?.gender}`}
                />
                {data?.species && <p>Especie {data?.species}</p>}
                {data?.status && (
                  <p>
                    Status{" "}
                    {(data?.status === "unknown" && "desconhecido") ||
                      (data?.status === "Dead" && "morto") ||
                      (data?.status === "Alive" && "vivo") ||
                      data?.status}
                  </p>
                )}
                {data?.origin && (
                  <p>
                    Origem{" "}
                    {data?.origin?.name === "unknown"
                      ? "desconhecida"
                      : data?.origin?.name}
                  </p>
                )}
              </div>
            );
          })
        )}
      </Container>
    </>
  );
};
