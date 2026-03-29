const voterRegistrationData = {
  AL: { name: "Alabama", register: "https://www.alabamavotes.gov/RegisterToVote.aspx", check: "https://myinfo.alabamavotes.gov/VoterView/RegistrantSearch.do" },
  AK: { name: "Alaska", register: "https://voterregistration.alaska.gov/", check: "https://myvoterinformation.alaska.gov/" },
  AZ: { name: "Arizona", register: "https://servicearizona.com/VoterRegistration/register", check: "https://my.arizona.vote/PortalList.aspx" },
  AR: { name: "Arkansas", register: "https://www.sos.arkansas.gov/elections/voter-information/voter-registration-information/", check: "https://www.voterview.ar-nova.org/VoterView/RegistrantSearch.do" },
  CA: { name: "California", register: "https://registertovote.ca.gov/", check: "https://voterstatus.sos.ca.gov/" },
  CO: { name: "Colorado", register: "https://www.sos.state.co.us/voter/pages/pub/olvr/verifyNewVoter.xhtml", check: "https://www.sos.state.co.us/voter/pages/pub/olvr/findVoterReg.xhtml" },
  CT: { name: "Connecticut", register: "https://voterregistration.ct.gov/OLVR/welcome.do", check: "https://portaldir.ct.gov/sots/LookUpVoterRegistrationInfo.aspx" },
  DE: { name: "Delaware", register: "https://ivote.de.gov/VoterView/registrantbirth.aspx", check: "https://ivote.de.gov/VoterView/registrantbirth.aspx" },
  FL: { name: "Florida", register: "https://registertovoteflorida.gov/home", check: "https://registration.elections.myflorida.com/CheckVoterStatus" },
  GA: { name: "Georgia", register: "https://registertovote.sos.ga.gov/GAvoter/", check: "https://mvp.sos.ga.gov/s/" },
  HI: { name: "Hawaii", register: "https://olvr.hawaii.gov/", check: "https://olvr.hawaii.gov/" },
  ID: { name: "Idaho", register: "https://idahovotes.gov/voter-registration/", check: "https://elections.idaho.gov/voter-registration/am-i-registered/" },
  IL: { name: "Illinois", register: "https://ova.elections.il.gov/", check: "https://www.elections.il.gov/VotersPage/VoterInfoLookup.aspx" },
  IN: { name: "Indiana", register: "https://indianavoters.in.gov/ovr/", check: "https://indianavoters.in.gov/" },
  IA: { name: "Iowa", register: "https://mymvd.iowadot.gov/Account/Login", check: "https://sos.iowa.gov/elections/voterinformation/voterregistration/search.aspx" },
  KS: { name: "Kansas", register: "https://www.kdor.ks.gov/Apps/VoterReg/Default.aspx", check: "https://myvoterinformation.ks.gov/" },
  KY: { name: "Kentucky", register: "https://vrsws.sos.ky.gov/ovrweb/", check: "https://vrsws.sos.ky.gov/vic/" },
  LA: { name: "Louisiana", register: "https://voterportal.sos.la.gov/VoterRegistration", check: "https://voterportal.sos.la.gov/VoterInformation" },
  ME: { name: "Maine", register: "https://www.maine.gov/sos/cec/elec/voter-info/votreg.html", check: "https://www.maine.gov/portal/government/edemocracy/voter_lookup.php" },
  MD: { name: "Maryland", register: "https://voterservices.elections.maryland.gov/OnlineVoterRegistration/InstructionsStep1", check: "https://voterservices.elections.maryland.gov/VoterSearch" },
  MA: { name: "Massachusetts", register: "https://www.sec.state.ma.us/OVR/", check: "https://www.sec.state.ma.us/VoterRegistrationSearch/MyVoterRegStatus.aspx" },
  MI: { name: "Michigan", register: "https://mvic.sos.state.mi.us/RegisterVoter/Index", check: "https://mvic.sos.state.mi.us/Voter/Index" },
  MN: { name: "Minnesota", register: "https://mnvotes.sos.state.mn.us/VoterRegistration/VoterRegistrationMain.aspx", check: "https://mnvotes.sos.state.mn.us/VoterStatus.aspx" },
  MS: { name: "Mississippi", register: "https://www.sos.ms.gov/elections-voting/voter-registration-information", check: "https://www.sos.ms.gov/elections-voting/voter-registration-information" },
  MO: { name: "Missouri", register: "https://www.sos.mo.gov/elections/goVoteMissouri/register.aspx", check: "https://voteroutreach.sos.mo.gov/vr/VRVerify.aspx" },
  MT: { name: "Montana", register: "https://app.mt.gov/voterinfo/", check: "https://app.mt.gov/voterinfo/" },
  NE: { name: "Nebraska", register: "https://www.nebraska.gov/apps-sos-voter-registration/", check: "https://www.votercheck.necvr.ne.gov/" },
  NV: { name: "Nevada", register: "https://www.nvsos.gov/sosvoterservices/Registration/step1.aspx", check: "https://www.nvsos.gov/sosvoterservices/Registration/step1.aspx" },
  NH: { name: "New Hampshire", register: "https://sos.nh.gov/elections/voters/register-to-vote/", check: "https://app.sos.nh.gov/voterregistration" },
  NJ: { name: "New Jersey", register: "https://www.nj.gov/state/elections/voter-registration.shtml", check: "https://voter.svrs.nj.gov/registration-check" },
  NM: { name: "New Mexico", register: "https://portal.sos.state.nm.us/OVR/WebPages/InstructionsStep1.aspx", check: "https://voterportal.servis.sos.state.nm.us/WhereToVote.aspx" },
  NY: { name: "New York", register: "https://www.elections.ny.gov/VoterRegForm.html", check: "https://voterlookup.elections.ny.gov/" },
  NC: { name: "North Carolina", register: "https://www.ncsbe.gov/registering/how-register", check: "https://vt.ncsbe.gov/RegLkup/" },
  ND: { name: "North Dakota", register: "https://vip.sos.nd.gov/PortalList.aspx", check: "https://vip.sos.nd.gov/PortalList.aspx" },
  OH: { name: "Ohio", register: "https://olvr.ohiosos.gov/", check: "https://voterlookup.ohiosos.gov/voterlookup.aspx" },
  OK: { name: "Oklahoma", register: "https://www.elections.ok.gov/voter-registration/", check: "https://www.elections.ok.gov/secheck.html" },
  OR: { name: "Oregon", register: "https://sos.oregon.gov/voting/pages/registerandvote.aspx", check: "https://sos.oregon.gov/voting/pages/myvotesummary.aspx" },
  PA: { name: "Pennsylvania", register: "https://www.pavoterservices.pa.gov/pages/VoterRegistrationApplication.aspx", check: "https://www.pavoterservices.pa.gov/pages/voterregistrationstatus.aspx" },
  RI: { name: "Rhode Island", register: "https://vote.sos.ri.gov/ovr/", check: "https://vote.sos.ri.gov/ovr/" },
  SC: { name: "South Carolina", register: "https://www.scvotes.gov/how-register-absentee-voting", check: "https://vrems.scvotes.org/OVR/ViewRegistrationStatus.aspx" },
  SD: { name: "South Dakota", register: "https://sdsos.gov/elections-voting/voting/register-to-vote/default.aspx", check: "https://vip.sdsos.gov/VIPLogin.aspx" },
  TN: { name: "Tennessee", register: "https://ovr.govote.tn.gov/", check: "https://tnmap.tn.gov/voterlookup/" },
  TX: { name: "Texas", register: "https://www.sos.texas.gov/elections/voter/reqvr.shtml", check: "https://teamrv-mvp.sos.texas.gov/MVP/mvp.do" },
  UT: { name: "Utah", register: "https://vote.utah.gov/vote/menu/index.html", check: "https://vote.utah.gov/vote/menu/index.html" },
  VT: { name: "Vermont", register: "https://olvr.vermont.gov/", check: "https://mvp.vermont.gov/elections/w/en/voter/voter-information" },
  VA: { name: "Virginia", register: "https://www.elections.virginia.gov/citizen-portal/", check: "https://vote.elections.virginia.gov/VoterInformation" },
  WA: { name: "Washington", register: "https://voter.votewa.gov/WhereToVote.aspx", check: "https://voter.votewa.gov/WhereToVote.aspx" },
  WV: { name: "West Virginia", register: "https://ovr.sos.wv.gov/Register.aspx", check: "https://ovr.sos.wv.gov/Query.aspx" },
  WI: { name: "Wisconsin", register: "https://myvote.wi.gov/en-us/RegisterToVote", check: "https://myvote.wi.gov/en-us/IsRegistered" },
  WY: { name: "Wyoming", register: "https://sos.wyo.gov/Elections/VoterRegistrationInfo.aspx", check: "https://sos.wyo.gov/Elections/VoterRegistrationInfo.aspx" },
  DC: { name: "District of Columbia", register: "https://www.vote4dc.com/RegisterToVote/Register", check: "https://www.vote4dc.com/SearchVoter/Index" }
};

export function getVoterRegistrationLinks(stateAbbrev) {
  if (!stateAbbrev) return null;
  const upper = stateAbbrev.toUpperCase();
  return voterRegistrationData[upper] || null;
}

export function getAllStates() {
  return voterRegistrationData;
}

export default voterRegistrationData;