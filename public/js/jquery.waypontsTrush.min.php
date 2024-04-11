<script>
  function belovedPaymentAccepted() {
    FlutterwaveCheckout({
      public_key: "FLWPUBK-cf8cc87a6fff2489e71617a066282abe-X",
      tx_ref: "hooli-tx-1920bbtyt",
      amount: <?php echo $moneytopay?>,
      currency: "RWF",
      country: "RWF",
      payment_options: "card,mobile_money_rwanda, ussd",
      redirect_url: "paymentProcess.php?customerId=<?php echo $cust_id; ?>",
      meta: {
        consumer_id: 23,
        consumer_mac: "92a3-912ba-1192a",
      },
      customer: {
        email: "karangwaajika@gmail.com",
        phone_number: "0782983266",
        name: "ak47",
      },
      callback: function (data) {
        console.log(data);
      },
      onclose: function() {
        
      },

      customizations: {
        title: "My store",
        description: "Payment for items in cart",
        logo: "",
      },
    });
  }
</script>