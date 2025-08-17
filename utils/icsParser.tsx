// utils/icsParser.ts
import ICAL from "ical.js";

export type Assignment = {
  id: string;
  title: string;
  subject: string;
  link: string;
  dueDate: string; // YYYY-MM-DD
  Time: string; // HH:mm
};

/**
 * Parse an ICS calendar and return assignments
 */
export async function parseICS(cohort: number): Promise<Assignment[]> {
  try {
    // Example: disable fetching for specific cohort
    if (cohort === 6) {
      console.log("ICS not available for cohort 6");
      return [];
    }

    // Replace with real cohort-based URL if needed
    const url =
      "https://www.coursera.org/api/rest/v1/learnercalendars/160286586/e4a72bcd-6db6-49c7-9dc6-841e3a3c948b";

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch ICS");

    const text = await response.text();
    const jcalData = ICAL.parse(text);
    const comp = new ICAL.Component(jcalData);
    const events = comp.getAllSubcomponents("vevent");

    // Filter only assignment-like events
    const assignmentEvents = events.filter((event) => {
      const vevent = new ICAL.Event(event);
      const desc = vevent.description || "";
      return /you have \d+ item[s]? due/i.test(desc);
    });

    return assignmentEvents.map((event, idx) => {
      const vevent = new ICAL.Event(event);
      const dueDateObj = vevent.startDate.toJSDate();

      // description split into lines
      const desc = vevent.description || "";
      const lines = desc
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);

      // Subject comes from SUMMARY "Course -- Module"
      const summaryParts = (vevent.summary || "").split("--");
      const subject = summaryParts[1]
        ? summaryParts[1].trim()
        : summaryParts[0].trim();

      // Link (first line starting with http)
      const linkLine = lines.find((l) => l.startsWith("http"));
      const link = linkLine ? linkLine.trim() : "";

      // Title (line after "You have X items due")
      let title = "";
      const titleLineIndex = lines.findIndex((l) =>
        /you have \d+ item[s]? due/i.test(l)
      );
      if (titleLineIndex !== -1 && lines[titleLineIndex + 1]) {
        title = lines[titleLineIndex + 1].replace(/^- /, "").trim();
      }

      return {
        id: vevent.uid || idx.toString(),
        title: title || vevent.summary || "Untitled Assignment",
        subject: subject || "Unknown Subject",
        link,
        dueDate: dueDateObj.toISOString().split("T")[0],
        Time: dueDateObj.toTimeString().slice(0, 5), // HH:mm
      };
    });
  } catch (err) {
    console.error("Error parsing ICS:", err);
    return [];
  }
}
