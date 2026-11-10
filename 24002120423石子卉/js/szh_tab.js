// 石子卉 2026-11-04 GLM-5.3-Flash 新闻选项卡
// szh_tab.js —— 可复用的 Tab 选项卡组件（外引脚本，页面容器加 data-szh-tabs 属性即可启用）

// 实现选项卡初始化：为传入的选项卡容器绑定事件监听，可复用于页面中的多个选项卡组
function szh_initTabs(szh_container) {
  var szh_tabItems = szh_container.querySelectorAll('.szh_tab_item');
  var szh_panelItems = document.querySelectorAll('.szh_panel');

  // 实现选项卡点击切换：事件委托监听容器，先清除所有选项卡的选中状态，再设置当前元素的选中状态
  szh_container.addEventListener('click', function (szh_event) {
    var szh_current = szh_event.target.closest('.szh_tab_item');
    if (!szh_current) {
      return;
    }

    // 先清除所有选项卡的选中状态
    for (var szh_i = 0; szh_i < szh_tabItems.length; szh_i++) {
      szh_tabItems[szh_i].classList.remove('szh_active');
      szh_tabItems[szh_i].setAttribute('aria-selected', 'false');
    }

    // 再设置当前元素的选中状态
    szh_current.classList.add('szh_active');
    szh_current.setAttribute('aria-selected', 'true');

    // 切换内容面板：仅显示当前选项卡对应的面板
    var szh_panelId = szh_current.getAttribute('data-szh-panel');
    for (var szh_j = 0; szh_j < szh_panelItems.length; szh_j++) {
      if (szh_panelItems[szh_j].id === szh_panelId) {
        szh_panelItems[szh_j].classList.add('szh_show');
      } else {
        szh_panelItems[szh_j].classList.remove('szh_show');
      }
    }
  });
}

// 实现页面加载后自动初始化所有选项卡组：扫描带 data-szh-tabs 属性的容器并逐一绑定
(function szh_bootstrap() {
  var szh_groups = document.querySelectorAll('[data-szh-tabs]');
  for (var szh_k = 0; szh_k < szh_groups.length; szh_k++) {
    szh_initTabs(szh_groups[szh_k]);
  }
})();
