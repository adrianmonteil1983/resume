 $(function (){	
/************************************************ SCROLLBAR ********************************************************/
	$(".navbar a, footer a").on("click", function(event){

		event.preventDefault();
		let hash = this.hash;

		$('body, html').animate({scrollTop: $(hash).offset().top}, 900, function(){window.location.hash = hash});
	});

/*********************************************** MAILTO SENDING ********************************************************/
	$('.button1').click(function(){
		$('.comments').empty();
		const emailAdress = "mailto:monteiladrian@gmail.com?subject=recruitment&body=";
		const controlForms = $('.form-control');
		const regexPhone = /^[0-9]/;
		let isSubmitable = true

		const validInputs = controlForms.map((element, index, array) => {
			if(index.value === ''){
				$('#'+index.id+'+.comments').html("I need your " + index.name);
				isSubmitable = false;
				return false;
			}else{
				if(index.name === 'phone'){
					if(!index.value.match(regexPhone)){
						$('#'+index.id+'+.comments').html("only numbers");
						isSubmitable = false;
						return false;
					}
				} 	
				if(index.name === 'email'){
					if(!index.value.includes('@')){
						$('#'+index.id+'+.comments').html("enter a valid address");
						isSubmitable = false;
						return false
					}	
				}
			}
			return index.value;		
		})

		if(isSubmitable){
			const dataToSend = {
				first: validInputs[0],
				last: validInputs[1],
				email: validInputs[2],
				phone: validInputs[3],
			}
			
			let mailToSend = `hi my name is ${dataToSend.first} ${dataToSend.last}%0D%0A
			I am interested in your profile please contact me at ${dataToSend.email}%0D%0A
			or via mobile ${dataToSend.phone}.%0D%0A%0D%0A
			Regards.%0D%0A%0D%0A
			${dataToSend.first} ${dataToSend.last}`;

			window.location.href = emailAdress+mailToSend;
		}
	});
/*************************************** TOOLTIP ***************************************/
	$('.thumbnail img, .clickable img').mousemove(function(e){
		let x = e.pageX + 10;
		let y = e.pageY - 10 ;
		$('.spanclick').removeClass('hidden').offset({top: y, left: x});
	});

	$('.thumbnail img, .clickable img').mouseleave(function(){
		$('.spanclick').addClass('hidden');
	})
/************************************************** PHP NON AVAILABLE ***********************************/
		/*$.ajax(
			type:'POST',
			url : 'php/contact.php',
			data : postdata,
			dataType: 'json',
			success: function(result){
				if(result.isSucces)
				{
					$("#contact-form").append("<p class='thank-you'>Votre message a bien ete envoye. Merci de m'avoir contacte.</p>");
					$("#contact-form")[0].reset();
				}
				else
				{
					$("#firstname + .comments").html(result.firstnameError);
					$("#name + .comments").html(result.nameError);
					$("#email + .comments").html(result.emailError);
					$("#phone + .comments").html(result.phoneError);
					$("#message + .comments").html(result.messageError);
				}

			},
		});*/
	});