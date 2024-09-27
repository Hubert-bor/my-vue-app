import { createStore } from "vuex";


export default createStore({
  state: {
    userInfo: {},
    loggedIn: false,
    loadingState: true,
    errorLoadingState: false,
    organizations: [],
    searchCollapsibleSection: 20,
    theme: "",
    printMode: false,
    zoConfig: {},
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    savedViewDialog: false,
    refreshIntervalID: 0,
    savedViewFlag: false,
    savedFunctionDialog: false,
    regionInfo: [],
    hiddenMenus: [],
  },
  mutations: {
    login(state, payload) {
      if (payload) {
        state.loggedIn = payload.loginState;
        state.userInfo = payload.userInfo;
      }
    },
    logout(state) {
      state.loggedIn = false;
      state.userInfo = {};
    },
    endpoint(state, payload) {
      state.API_ENDPOINT = payload;
    },
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
    // setIndexData(state, payload) {
    //   state.indexData = payload;
    // },
    setSelectedOrganization(state, payload) {
      state.selectedOrganization = payload;
    },
    setOrganizations(state, payload) {
      state.organizations = payload;
    },
    setCurrentUser(state, payload) {
      state.currentuser = payload;
    },
    setSearchCollapseToggle(state, payload) {
      state.searchCollapsibleSection = payload;
    },
    setOrganizationPasscode(state, payload) {
      state.organizationData.organizationPasscode = payload;
    },
    setRUMToken(state, payload) {
      state.organizationData.rumToken = payload;
    },
    // setAllCurrentDashboards(state, payload) {
    //   state.allCurrentDashboards = payload;
    // },
    // setCurrentSelectedDashboard(state, payload) {
    //   state.currentSelectedDashboard = payload;
    // },
    setAllDashboardList(state, payload) {
      state.organizationData.allDashboardList = payload;
    },
    setOrganizationSettings(state, payload) {
      state.organizationData.organizationSettings = payload;
    },
    setFunctions(state, payload) {
      state.organizationData.functions = payload;
    },
    setStreams(state, payload) {
      state.organizationData.streams[payload.name] = payload;
    },
    resetStreams(state, payload) {
      state.organizationData.streams = payload;
    },
    // setSearch(state, payload) {
    //   state.search = payload;
    // },
    // setStreamFields(state, payload) {
    //   state.streamFields = payload;
    // },
    // setCurrentPanelsData(state, payload) {
    //   state.currentPanelsData = payload;
    // },
    setQuotaThresholdMsg(state, payload) {
      state.organizationData.quotaThresholdMsg = payload;
    },
    setConfig(state, payload) {
      state.zoConfig = payload;
    },
    setFolders(state, payload) {
      state.organizationData.folders = payload;
    },
    appTheme(state, payload) {
      state.theme = payload;
    },
    setPrintMode(state, payload) {
      state.printMode = payload;
    },
    setTimezone(state, payload) {
      state.timezone = payload;
    },
    setSavedViewDialog(state, payload) {
      state.savedViewDialog = payload;
    },
    setRefreshIntervalID(state, payload) {
      state.refreshIntervalID = payload;
    },
    setSavedViewFlag(state, payload) {
      state.savedViewFlag = payload;
    },
    setSavedFunctionDialog(state, payload) {
      state.savedFunctionDialog = payload;
    },
    setIsDataIngested(state, payload) {
      state.organizationData.isDataIngested = payload;
    },
    setRegionInfo(state, payload) {
      state.regionInfo = payload;
    },
    setHiddenMenus(state, payload) {
      state.hiddenMenus = payload;
    },
  },
  actions: {
    login(context, payload) {
      context.commit("login", payload);
    },
    logout(context) {
      context.commit("logout");
    },
    endpoint(context, payload) {
      context.commit("endpoint", payload);
    },
    // setIndexData(context, payload) {
    //   context.commit("setIndexData", payload);
    // },
    setSelectedOrganization(context, payload) {
      context.commit("setSelectedOrganization", payload);
    },
    setOrganizations(context, payload) {
      context.commit("setOrganizations", payload);
    },
    setCurrentUser(context, payload) {
      context.commit("setCurrentUser", payload);
    },
    setSearchCollapseToggle(context, payload) {
      context.commit("setSearchCollapseToggle", payload);
    },
    setOrganizationPasscode(context, payload) {
      context.commit("setOrganizationPasscode", payload);
    },
    resetOrganizationData(context, payload) {
      context.commit("resetOrganizationData", payload);
    },
    setRUMToken(context, payload) {
      context.commit("setRUMToken", payload);
    },
    // setAllCurrentDashboards(context, payload) {
    //   context.commit('setAllCurrentDashboards', payload);
    // },
    // setCurrentSelectedDashboard(context, payload) {
    //   context.commit('setCurrentSelectedDashboard', payload);
    // },
    setAllDashboardList(context, payload) {
      context.commit("setAllDashboardList", payload);
    },
    setOrganizationSettings(context, payload) {
      context.commit("setOrganizationSettings", payload);
    },
    setFolders(context, payload) {
      context.commit("setFolders", payload);
    },
    setFunctions(context, payload) {
      context.commit("setFunctions", payload);
    },
    setStreams(context, payload) {
      context.commit("setStreams", payload);
    },
    resetStreams(context, payload) {
      context.commit("resetStreams", payload);
    },
    // setSearch(context, payload) {
    //   context.commit("setSearch", payload);
    // },
    // setStreamFields(context, payload) {
    //   context.commit("setStreamFields", payload);
    // },
    // setCurrentPanelsData(context, payload) {
    //   context.commit('setCurrentPanelsData', payload);
    // },
    setQuotaThresholdMsg(context, payload) {
      context.commit("setQuotaThresholdMsg", payload);
    },
    setConfig(context, payload) {
      context.commit("setConfig", payload);
    },
    appTheme(context, payload) {
      context.commit("appTheme", payload);
    },
    setPrintMode(context, payload) {
      context.commit("setPrintMode", payload);
    },
    setTimezone(context, payload) {
      context.commit("setTimezone", payload);
    },
    setSavedViewDialog(context, payload) {
      context.commit("setSavedViewDialog", payload);
    },
    setRefreshIntervalID(context, payload) {
      context.commit("setRefreshIntervalID", payload);
    },
    setSavedViewFlag(context, payload) {
      context.commit("setSavedViewFlag", payload);
    },
    setSavedFunctionDialog(context, payload) {
      context.commit("setSavedFunctionDialog", payload);
    },
    setIsDataIngested(context, payload) {
      context.commit("setIsDataIngested", payload);
    },
    setRegionInfo(context, payload) {
      context.commit("setRegionInfo", payload);
    },
    setHiddenMenus(context, payload) {
      context.commit("setHiddenMenus", payload);
    },
  },
  modules: {},
});
