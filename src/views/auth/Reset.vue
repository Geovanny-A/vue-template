<template>
  <div>
    <b-row class="my-3">
      <b-col>
        <b-input
          size="sm"
          :placeholder="$t('reset.back')"
          class="rounded text-center border text-primary"
        ></b-input>
      </b-col>
    </b-row>

    <b-row class="my-2">
      <b-col>
        <b-button size="sm" class="rounded" variant="primary" block>{{
          $t("reset.button")
        }}</b-button>
      </b-col>
    </b-row>
    <b-row class="my-4">
      <b-col>
        <small>
          <b-link :to="{ name: 'login' }">
            {{ $t("reset.back") }}
          </b-link>
        </small>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  name: "Reset",
};
</script>
