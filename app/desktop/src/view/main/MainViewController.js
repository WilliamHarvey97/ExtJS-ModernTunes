Ext.define('ModernTunes.view.main.MainViewController', {
  requires: [
    'ModernTunes.view.Preview'
  ],
  extend: 'Ext.app.ViewController',
  alias: 'controller.mainviewcontroller',

  onButtonClick: function (button) {
    this.lookupReference('df').setValue(Date.now())
  },

  onShowPreview: function (record) {
    if (this.getView().down('video')) {
      return;
    }

    const videoConfig = {
      xtype: 'video',
      url: record.data.preview,
      posterUrl: record.data.image
    };
    const linkConfig = {
      docked: 'bottom',
      xtype: 'component',
      data: {
        itunesstore: record.data.itunesstore
      }
    };
    const containerConfig = { // parent container of the video and the anchor/link
      xtype: 'container',
      title: record.data.title + ' — ' + record.data.artist,
      style: '{background-color: black;}',
      layout: 'fit',
      items: [
        videoConfig,
        linkConfig
      ]
    };

    let vid = Ext.create({
      xtype: 'preview',
      layout: 'fit',
      title: record.data.title,
      items: [containerConfig],
    });
    vid.show();
  },

  onThumbSelect: function (thumbs, record) {
    this.onShowPreview(record);
  },

  onGridSelect: function (grid, records) {
    this.onShowPreview(records[0]);
  },

});
