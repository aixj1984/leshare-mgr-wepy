import base from './base'
import wepy from 'wepy';

export default class open extends base {
  /**
   * 查询所有草稿
   */
  static async drafts() {
    const url = `${this.baseUrl}/code/draft_list`;
    const drafts = await this.get(url);
    drafts.sort((a, b) => b.create_time - a.create_time);
    drafts.forEach(draft => {
      draft.create_time_text = this.convertToTime(draft.create_time);
    });
    return drafts;
  }
  /**
   * 查询所有模板
   */
  static async templates() {
    const url = `${this.baseUrl}/code/template_list`;
    const templates = await this.get(url);
    templates.sort((a, b) => b.create_time - a.create_time);
    templates.forEach(template => {
      // 这里要加一个字段，表示是否被勾选，默认为false
      template.create_time_text = this.convertToTime(template.create_time);
      template.check = false;
    });
    return templates;
  }
  /**
   * 查询小程序列表
   */
  static async apps(key) {
    const url = `${this.baseUrl}/code/app_list?app_template=${key}`;
    const apps = await this.get(url);
    apps.forEach(app => {
      app.check = false;
      if (app.auditVersion == null) {
        app.auditVersion_text = '未知';
      } else {
        app.auditVersion_text = app.auditVersion;
      }
      if (app.demoVersion == null) {
        app.demoVersion_text = '未知';
      } else {
        app.demoVersion_text = app.demoVersion;
      }
      if (app.prodVersion == null) {
        app.prodVersion_text = '未知';
      } else {
        app.prodVersion_text = app.prodVersion;
      }
    });
    return apps;
  }

  // 处理时间
  static convertToTime (time) {
    const d = new Date(time * 1000);
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${d.getMinutes()}`;
  }
  /****
   *提交草稿
   */
  static submitDraft(draft) {
    const url = `${this.baseUrl}/code/template`;
    return this.post(url, draft);
  }
  /***
   * 删除模板
   * */
  static deleteTemplate(template) {
    const url = `${this.baseUrl}/code/template`;
    return this.delete(url, template);
  }
  /**
   * 提交审核
   */
  static submitAudit(apps) {
    const url = `${this.baseUrl}/code/submit_audit`;
    return this.post(url, apps);
  }

  /****
   * 提交体验版
   */
  static submitDemo(apps) {
    const url = `${this.baseUrl}/code/submit_demo`;
    return this.post(url, apps);
  }
  /****
   * 查询审核结果
   */
  static statusAudit(apps) {
    const url = `${this.baseUrl}/code/audit/status`;
    return this.post(url, apps);
  }

  /***
   * 版本发布
   */
  static publish(apps) {
    const url = `${this.baseUrl}/code/publish`;
    return this.post(url, apps)
  }
}
