const officeDescriptions = {
  "President of the United States": {
    level: "Federal",
    description: "The President is the head of state and government, serving as commander-in-chief of the armed forces. They sign or veto legislation, issue executive orders, and represent the nation in foreign affairs.",
    responsibilities: ["Signs bills into law or vetoes them", "Commands the military", "Negotiates treaties", "Appoints federal judges and cabinet members", "Sets the national policy agenda"]
  },
  "Vice President of the United States": {
    level: "Federal",
    description: "The Vice President presides over the U.S. Senate, casting tie-breaking votes. They are first in the presidential line of succession and often serve as a key advisor to the President.",
    responsibilities: ["Presides over the Senate", "Casts tie-breaking Senate votes", "First in presidential succession", "Advises the President"]
  },
  "U.S. Senator": {
    level: "Federal",
    description: "U.S. Senators represent their entire state in the Senate. They serve 6-year terms, confirm presidential appointments, ratify treaties, and participate in impeachment trials.",
    responsibilities: ["Writes and votes on federal legislation", "Confirms presidential appointments", "Ratifies treaties", "Represents state interests at the federal level"]
  },
  "U.S. Representative": {
    level: "Federal",
    description: "U.S. Representatives serve their specific congressional district. They serve 2-year terms, introduce and vote on legislation, and have the sole power to initiate revenue bills.",
    responsibilities: ["Writes and votes on federal legislation", "Initiates revenue bills", "Represents district constituents", "Power to impeach federal officials"]
  },
  "Governor": {
    level: "State",
    description: "The Governor is the chief executive of the state, responsible for implementing state laws, managing the state budget, and commanding the state's National Guard.",
    responsibilities: ["Signs or vetoes state legislation", "Manages state budget", "Appoints state officials and judges", "Commands state National Guard"]
  },
  "Lieutenant Governor": {
    level: "State",
    description: "The Lieutenant Governor is second in command of the state. In many states, they preside over the state Senate and assume the governorship if the Governor cannot serve.",
    responsibilities: ["Presides over state Senate", "First in line for governorship", "Casts tie-breaking votes in state Senate"]
  },
  "State Senator": {
    level: "State",
    description: "State Senators represent districts within the state legislature. They write and vote on state laws covering education, healthcare, transportation, and other state-level issues.",
    responsibilities: ["Writes and votes on state legislation", "Approves state budget", "Represents district in state matters", "Oversees state agencies"]
  },
  "State Representative": {
    level: "State",
    description: "State Representatives serve in the lower chamber of the state legislature. They introduce bills, vote on state laws, and advocate for their district's needs.",
    responsibilities: ["Introduces and votes on state bills", "Approves state budget", "Advocates for district needs", "Serves on legislative committees"]
  },
  "State Assembly Member": {
    level: "State",
    description: "State Assembly Members serve in the lower chamber of the state legislature. They introduce bills, vote on state laws, and advocate for their district's needs.",
    responsibilities: ["Introduces and votes on state bills", "Approves state budget", "Advocates for district needs", "Serves on legislative committees"]
  },
  "Attorney General": {
    level: "State",
    description: "The Attorney General is the state's chief legal officer. They represent the state in legal matters, enforce consumer protection laws, and may investigate public corruption.",
    responsibilities: ["Represents the state in court", "Enforces consumer protection", "Issues legal opinions", "Investigates public corruption"]
  },
  "Secretary of State": {
    level: "State",
    description: "The Secretary of State oversees elections, maintains official state records, and often handles business registrations. They are the state's chief elections officer.",
    responsibilities: ["Administers state elections", "Maintains official records", "Registers businesses", "Certifies election results"]
  },
  "County Executive": {
    level: "County",
    description: "The County Executive is the chief administrator of the county government. They oversee county departments, manage the budget, and implement county policies.",
    responsibilities: ["Manages county departments", "Proposes county budget", "Implements county policies", "Appoints department heads"]
  },
  "County Commissioner": {
    level: "County",
    description: "County Commissioners serve on the county's governing board. They set county policies, approve budgets, and oversee services like roads, public safety, and parks.",
    responsibilities: ["Sets county policies", "Approves county budget", "Oversees county services", "Represents district within county"]
  },
  "Sheriff": {
    level: "County",
    description: "The Sheriff is the chief law enforcement officer of the county. They manage the county jail, provide court security, and patrol unincorporated areas.",
    responsibilities: ["Enforces laws in the county", "Manages county jail", "Provides court security", "Serves legal papers"]
  },
  "District Attorney": {
    level: "County",
    description: "The District Attorney prosecutes criminal cases on behalf of the people. They decide which cases to pursue, negotiate plea deals, and represent the state in trials.",
    responsibilities: ["Prosecutes criminal cases", "Decides charging decisions", "Represents the people in court", "Works with law enforcement"]
  },
  "Mayor": {
    level: "Local",
    description: "The Mayor is the chief executive of the city or town. They lead city government, propose budgets, and represent the community.",
    responsibilities: ["Leads city government", "Proposes city budget", "Represents the city publicly", "May veto city council decisions"]
  },
  "City Council Member": {
    level: "Local",
    description: "City Council Members are the legislative body of the city. They pass local ordinances, approve the city budget, and address community issues like zoning, public safety, and local services.",
    responsibilities: ["Passes local ordinances", "Approves city budget", "Addresses zoning issues", "Responds to constituent concerns"]
  },
  "School Board Member": {
    level: "Local",
    description: "School Board Members oversee the local school district. They set education policies, approve budgets, hire superintendents, and ensure quality education for students.",
    responsibilities: ["Sets education policies", "Approves school budget", "Hires superintendent", "Oversees curriculum standards"]
  }
};

export function getOfficeDescription(title) {
  if (!title) return null;
  if (officeDescriptions[title]) return officeDescriptions[title];
  const lower = title.toLowerCase();
  for (const [key, value] of Object.entries(officeDescriptions)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return value;
    }
  }
  if (lower.includes("senator") && lower.includes("u.s")) return officeDescriptions["U.S. Senator"];
  if (lower.includes("senator")) return officeDescriptions["State Senator"];
  if (lower.includes("representative") || lower.includes("congressm")) return officeDescriptions["U.S. Representative"];
  if (lower.includes("governor") && !lower.includes("lieutenant")) return officeDescriptions["Governor"];
  if (lower.includes("lieutenant governor")) return officeDescriptions["Lieutenant Governor"];
  if (lower.includes("mayor")) return officeDescriptions["Mayor"];
  if (lower.includes("council")) return officeDescriptions["City Council Member"];
  if (lower.includes("sheriff")) return officeDescriptions["Sheriff"];
  if (lower.includes("district attorney") || lower.includes("prosecutor")) return officeDescriptions["District Attorney"];
  if (lower.includes("school board")) return officeDescriptions["School Board Member"];
  if (lower.includes("commissioner")) return officeDescriptions["County Commissioner"];
  if (lower.includes("assembly")) return officeDescriptions["State Assembly Member"];
  if (lower.includes("attorney general")) return officeDescriptions["Attorney General"];
  if (lower.includes("secretary of state")) return officeDescriptions["Secretary of State"];
  return null;
}

export function getAllOfficeDescriptions() {
  return officeDescriptions;
}

export default officeDescriptions;