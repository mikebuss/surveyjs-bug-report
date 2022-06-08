import './App.css';
import * as SurveyPDF from "survey-pdf";

const surveyDefinition = {
  "title": "Development Sprint",
  "pages": [
      {
          "elements": [
              {
                  "title": "What did you work on yesterday?",
                  "type": "comment",
                  "isRequired": true,
                  "name": "work-on-yesterday"
              },
              {
                  "title": "What do you plan to work on today?",
                  "type": "comment",
                  "isRequired": true,
                  "name": "work-on-today"
              },
              {
                  "name": "blockers",
                  "type": "comment",
                  "isRequired": true,
                  "title": "Is anything blocking you from completing your work?"
              }
          ]
      }
  ]
}

const response1 = {
  "work-on-today": "Two",
  "blockers": "Three",
  "work-on-yesterday": "One"
}

const response2 = {
  "work-on-today": "Five",
  "blockers": "Six",
  "work-on-yesterday": "Four"
}

const response3 = {
  "work-on-today": "Eight",
  "blockers": "Nine",
  "work-on-yesterday": "Seven"
}

const surveyPDFForResponse = (
  surveyDefinition,
  response
) => {
  const surveyPDF = new SurveyPDF.SurveyPDF(surveyDefinition, {
    fontName: "Courier",
    fontSize: 12,
    margins: {
      left: 10,
      right: 10,
      top: 24,
      bot: 10,
    },
  });

  surveyPDF.haveCommercialLicense = true;
  surveyPDF.data = response;

  surveyPDF.onRenderFooter.add((survey, canvas) => {
  canvas.drawText({
    text: "TeamDynamic.io",
    fontSize: 10,
  });
});

  return surveyPDF;
};

function App() {
  return (
    <div className="App">
      <h1>SurveyJS Bug Reproduction</h1>
      <p>Click the button below to download multiple sample PDF's to demonstrate the bug.</p>
      <button onClick={() => {
        console.log("Downloading...");

        const pdf1  = surveyPDFForResponse(surveyDefinition, response1);
        const pdf2  = surveyPDFForResponse(surveyDefinition, response2);
        const pdf3  = surveyPDFForResponse(surveyDefinition, response3);

        pdf1.save("PDF1.pdf")
        pdf2.save("PDF2.pdf")
        pdf3.save("PDF3.pdf")
      }}>Download PDFs</button>
    </div>
  );
}

export default App;
