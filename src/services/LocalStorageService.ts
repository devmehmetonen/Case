const LocalStorageService = (function () {
  let _service: any;
  function _getService(this: {
    getService: () => any;
    setToken: (access: string, refresh: string) => void;
    getAccessToken: () => string | null;
    getRefreshToken: () => string | null;
    clearToken: () => void;
  }) {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(access: string, refresh?: string) {
    if (access) {
      localStorage.setItem("access_token", access);
    }
    if (refresh) {
      localStorage.setItem("refresh_token", refresh);
    }

  }
  function _getAccessToken() {
    return localStorage.getItem("access_token");
  }
  function _getRefreshToken() {
    return localStorage.getItem("refresh_token");
  }
  function _clearToken() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
export default LocalStorageService;
