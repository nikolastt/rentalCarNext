import React, { useEffect, useState } from "react";

const PageTeste = () => {
  const date = new Date(1665439411447).getTime();
  const now = new Date().getTime();

  console.log(now);

  const [time, setTime] = useState(now - date);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      getFormatedDate(time);
      setTime(time - 1000);
    }, 1000);
    if (time < 0) {
      alert("Tempo acabou");
    }
  }, [time]);

  const getFormatedDate = (milisseconds: number) => {
    const seconds = Math.floor((milisseconds % (60 * 1000)) / 1000);
    const minutes = Math.floor((milisseconds % (60 * 60 * 1000)) / (1000 * 60));

    setSeconds(seconds);
    setMinutes(minutes);
  };

  //     const days = Math.floor(distance / (24 * 60 * 60 * 1000));
  //     const hours = Math.floor(
  //       (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60)
  //     );
  //     const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60));
  //     const seconds = Math.floor((distance % (60 * 1000)) / 1000);

  return (
    <div className="flex justify-center">
      <div>
        <h2>
          Este Qr Code expirará em :{" "}
          <span className="text-red-500">
            {minutes} : {seconds}
          </span>
        </h2>
      </div>
    </div>
  );
};

export default PageTeste;
