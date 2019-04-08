<template>
  <div class="wholesale-modal-wrapper" v-show="displayed">
    <div class="wholesale-modal-center">
      <header class="modal-header weight-700 bg-cl-secondary">
        <i @click="closeWholesaleModal" class="modal-close material-icons cl-bg-tertiary">close</i>
      </header>
      <div class="wholesale-modal-title">
        <p>Request a quote</p>
      </div>
      <div class="wholesale">
        <form @submit.prevent="send" class="wholesale-form" novalidate>
          <div class="row wholesale-form-head">
            <div class="col-sm-6 title">Product</div>
            <div class="col-sm-4 title">Partnumber</div>
            <div class="col-sm-2 title">Qty</div>
          </div>
          <div class="row wholesale-form-body">
            <div class="col-xs-12 col-sm-6 text"><div class="hidden-md title">Product</div> {{ product.name }}</div>
            <div class="col-xs-12 col-sm-4 text"><div class="hidden-md title">Partnumber</div><i>{{ product.sku }}</i></div>
            <div class="col-xs-12 col-sm-2 text">
              <span class="hidden-md title">Qty</span>
              <input v-model="product.qty" size="5" type="text" class="qty" name="amount" id="wholesale-amount">
            </div>
          </div>
          <div class="field">
            <label for="wholesale-email" class="required">Email Address<span class="asterisk">*</span></label>
            <input
              v-model.trim="email"
              @blur="$v.email.$touch()"
              name="email"
              type="email"
              id="wholesale-email"
              :validations="[
                {
                  condition: !$v.email.required && $v.email.$error,
                  text: $t('Field is required.')
                },
                {
                  condition: !$v.email.email && $v.email.$error,
                  text: $t('Please provide valid e-mail address.')
                }
              ]"
            >
          </div>
          <div class="field">
            <label for="wholesale-email">Your request</label>
            <div class="input-box">
              <textarea v-model="comment" name="comment" id="wholesale-comments"/>
            </div>
          </div>
          <button type="submit" class="wholesale-btn">
            Submit
          </button>
        </form>
      </div>
      <div class="wholesale-log">
        <p>{{ log }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@vue-storefront/i18n'
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: 'WholesaleRequest',
  data () {
    return {
      email: '',
      log: '',
      comment: ''
    }
  },
  validations: {
    email: {
      required,
      email
    }
  },
  computed: {
    ...mapGetters({
      displayed: 'wholesale/displayed',
      product: 'product/productCurrent'
    })
  },
  methods: {
    showWholesaleModal () {
      this.$store.dispatch('wholesale/showModal')

      this.isModalVisible = true
      this.email = ''
      this.comment = ''
      this.log = ''

      var html = document.getElementsByTagName('html')[0]
      html.setAttribute('class', 'no-scroll')
    },
    closeWholesaleModal () {
      this.$store.dispatch('wholesale/hideModal')

      var html = document.getElementsByTagName('html')[0]
      html.removeAttribute('class', 'no-scroll')
    },
    send: function (event) {
      if (this.$v.$invalid) {
        var errorEmailText = ''
        if (!this.$v.email.required) {
          errorEmailText = 'The email field is required.'
        } else if (!this.$v.email.email) {
          errorEmailText = 'Please provide valid email address.'
        }
        this.$v.$touch()
        this.$bus.$emit('notification', {
          type: 'error',
          message: errorEmailText,
          action1: { label: i18n.t('OK'), action: 'close' }
        })
        return
      }

      this.$store.dispatch('wholesale/send', {
        email: this.email,
        comment: this.comment,
        amount: this.product.qty,
        sku: this.product.sku,
        name: this.product.name
      }).then((response) => {
        if (response.status === 200) {
          this.closeWholesaleModal()
          this.$bus.$emit('notification', {
            type: 'success',
            message: i18n.t('Message sent. Thanks.'),
            action1: { label: i18n.t('OK'), action: 'close' }
          })
        } else {
          this.log = 'Message not sent. Something went wrong - ' + response.statusText
        }
      })
      event.preventDefault()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~theme/css/variables/colors';
@import '~theme/css/helpers/functions/color';
$color-primary: color(primary);
$color-tertiary: color(tertiary);
$color-secondary: color(secondary);
$color-white: color(white);
$color-black: color(black);
$color-gray: color(wholesale-gray);
$bg-secondary: color(secondary, $colors-background);

.wholesale-modal-wrapper {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: auto;
  z-index: 999;
  text-align: inherit;
  background-color: rgba(0, 0, 0, 0.4);

  .wholesale-modal-center {
    position: fixed;
    width: 800px;
    height: 522px;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -250px;
    background: $color-white;
    border-radius: 4px;

    @media (max-width: 800px) {
      min-height: 100%;
      min-width: 100%;
      margin: 0;
      left: 0;
      right: 0;
      top: 0;
      border-radius: 0px;
      width: 100%;
    }

    .modal-close {
      position: absolute;
      cursor: pointer;
      right: 0;
      top: 0;
      margin: 7px 7px 0 0;
      background: $color-white;
      border-radius: 4px;
    }
    .modal-header {
      font-size: 16px;
      margin: 3px;
      border: 1px solid #aaa;
      border-radius: 4px;
      height: 30px;
      background: linear-gradient(to bottom, rgba(222,222,222,1) 0%,rgba(204,204,204,1) 100%);
    }
    .wholesale-modal-title {
      height: 27px;
      font-weight: bold;
      color: #323a44;
      border-bottom: 1px solid $color-gray;
      margin: 0 15px 0 15px;
    }
    .wholesale-form {
      margin: 15px 20px;

      @media (max-width: 800px) {
        .wholesale-form-head {
          display: none;
        }
      }

      .wholesale-form-head {
        background-color: #f2f2f2;
        border-bottom: 1px solid $color-gray;
        .title {
          text-align: left;
          text-transform: uppercase;
          font-weight: normal;
          border: 0;
          font-size: 13px;
          padding: 9px 5px;
        }
      }
      .wholesale-form-body {
        @media (max-width: 800px) {
          .qty {
            display: inline-block;
          }
        }
        .text {
          text-align: left;
          text-transform: uppercase;
          font-weight: normal;
          border: 0;
          font-size: 13px;
          border-bottom: 1px solid #ddd;
          padding: 5px;
        }
      }
      input {
        display: block;
        outline: none;
        color: $color-black;
      }
      label {
        font-size: 12px;
        color: #596573;
      }
      .asterisk {
        color: #f15c22;
      }
      textarea {
        margin-top: 15px;
        padding: 7px;
        color: $color-black;
      }
      .field {
        margin-top: 20px;
        margin-left: 15px;
      }
      button {
        margin-top: 12px;
        border: 0;
        height: 24px;
        font-size: 14px;
        padding: 0 15px 0 10px;
        border-radius: 4px;
        box-shadow: none;
        cursor: pointer;
        background: #2e323f;
        color: $color-white;
      }
      #wholesale-required-email {
        color: #f00;
        font-size: 10px;
        margin-top: -4px;

        .arrow {
          font-size: 20px;
          padding: 0 4px 0 1px;
        }
      }
      #wholesale-email {
        width: 250px;
        height: 23px;
        border: 1px solid $color-gray;
        padding: 2px;
        margin-top: 15px;
      }
      #wholesale-comments {
        width: 260px;
        height: 120px;
        border: 1px solid $color-gray;
      }
    }
    .wholesale-log {
      color: red;
      text-align: center;
      margin-top: -15px;
    }
  }
}
</style>
