function wait(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

const MONTH = "09";
const MIN_DATE = "10";
const MAX_DATE = "10";

chrome.runtime.sendMessage({}, (response) => {
  var checkReady = setInterval(async () => {
    if (document.readyState === "complete") {
      const timeElements = document.getElementsByClassName(
        "form-check-label txt-time"
      );
      if (timeElements.length === 0) {
        return;
      }
      clearInterval(checkReady);
      document.getElementById(`2021-${MONTH}`).click();
      await wait(1000);
      const cardElements = document.getElementsByClassName("card top")[0];
      const datesElements = cardElements.getElementsByClassName(
        "form-check-label text-center txt-5"
      );
      for (let datesElement of datesElements) {
        let [, date] = datesElement.innerHTML.trim().split(" ");
        if (date.length > 4) {
          let [dayS, monthS, yearS] = date.split("/");
          const day = parseInt(dayS, 10);
          const month = parseInt(monthS, 10);
          if (
            month === parseInt(MONTH, 10) &&
            day >= parseInt(MIN_DATE, 10) &&
            day <= parseInt(MAX_DATE, 10)
          ) {
            document
              .getElementById(`${yearS}-${monthS}-${dayS}T00:00:00`)
              .click();
            await wait(1000);
            const elements = document.getElementsByClassName(
              "form-check-label txt-time"
            );
            if (elements.length > 0) {
              (elements[0] as any).click();
              (
                document.getElementsByClassName(
                  "btn btn-teal btn-lg btn-block txt-4-SemiBold ng-star-inserted"
                )[0] as any
              ).click();
              console.log("Find one", date, elements[0].innerHTML);
              return;
            }
          }
        }
      }
      await wait(1000);
      window.location.reload();
    }
  });
});
