import $ from 'jquery';
import Ember from 'ember';
import layout from '../templates/components/jqm-datepicker';

export default Ember.TextField.extend({
  tagName: 'input',
  layout: layout,
  readonly: 'readonly',
  attributeBindings: ['required', 'name', 'autofocus'],
  dateFormat: 'dd/mm/yy',
  showToday: false,
  didInsertElement() {
    var elem = $(this.$());
    var that = this;
    elem.datepicker({
      dateFormat: this.get('dateFormat'),
      onSelect: function () {

        // Propagate value change, only when the variable value has been assigned
        Ember.run.once(that, 'refresh');
      }
    });

    if (this.get('showToday')) {
      elem.datepicker('setDate', new Date());
      this.$().change(); // Force to read value
    }

    if (this.get('months')) {
      elem.datepicker('option', 'monthNames', this.get('months'));
    }

    if (this.get('days')) {
      elem.datepicker('option', 'dayNamesMin', this.get('days'));
    }

    // Remove datepicker from the bottom of the page
    $( '.ui-datepicker' ).css('display', 'none');
  },
  refresh() {
    this.$().change();
  }
});
