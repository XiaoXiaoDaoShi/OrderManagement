<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>

<!DOCTYPE HTML>
<html>
	<head>
		<title>注册</title>
		<link href="${pageContext.request.contextPath}/WebContent/css/bootstrap.css" rel='stylesheet' type='text/css' />
		<!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
		<!-- <script src="js/jquery.min.js"></script> -->
		 <!-- Custom Theme files -->
		<link href="${pageContext.request.contextPath}/WebContent/css/style.css" rel='stylesheet' type='text/css' />
   		 <!-- Custom Theme files -->
   		 <!---- start-smoth-scrolling---->
		<!-- <script type="text/javascript" src="js/move-top.js"></script> -->
		<!-- <script type="text/javascript" src="js/easing.js"></script> -->
		<script type="text/javascript" src="${pageContext.request.contextPath}/WebContent/js/jquery-3.4.1.js"></script>
		<script type="text/javascript">
			jQuery(document).ready(function($) {
				$(".scroll").click(function(event){		
					event.preventDefault();
					$('html,body').animate({scrollTop:$(this.hash).offset().top},1000);
				});
			});
		</script>
		 <!---- start-smoth-scrolling---->
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		</script>
		<!----start-top-nav-script---->
		<script>
			$(function() {
				var pull 		= $('#pull');
					menu 		= $('nav ul');
					menuHeight	= menu.height();
				$(pull).on('click', function(e) {
					e.preventDefault();
					menu.slideToggle();
				});
				$(window).resize(function(){
	        		var w = $(window).width();
	        		if(w > 320 && menu.is(':hidden')) {
	        			menu.removeAttr('style');
	        		}
	    		});
			});
			
			$(function(){
				var userNameFlag = false;
				var userPasswordFlag = false;
				//异步确认用户名是否重复
				<!-- 
				$("#username").blur(function(){
					var username = $("#username").val();
					$.ajax({
						url:"UserNameCheckServlet",
						type:"post",
						dataType:"text",
						data:"userName=" + username,
						success:function(message){
							if(message == 0){
								//可以使用
								$("#regis_span").html("用户名可以使用");
								userNameFlag = true;
							}
							else{
								//不能使用
								$("#regis_span").html("用户名不可使用");
								userNameFlag = false;
							}
								
						}
					});
				});
				-->
				//确认密码
				$("#repassword").blur(function(){
					var password = $("#password").val();
					var repassword = $("#repassword").val();
					
					if(password!=null && password!="" && repassword!=null && password== repassword ){
						//密码一致
						$("#pass_span").html("密码一致");
						passwordFlag = true;
					}
					else if(password!=null && password!=""){
						//不一致
						$("#pass_span").html("密码不一致");
						passwordFlag = false;		
					}
				});
				
				$("form").submit(function(){
					return userNameFlag && userPasswordFlag;
				})
			});
		</script>
		<!----//End-top-nav-script---->
	</head>
	<body>
	<span>${pageContext.request.contextPath}</span>
		<!----- start-header---->
			<div id="home" class="header">
					<div class="top-header">
						<div class="container">
						<div class="logo">
							<a href="index.html"><img src="images/logo.png" title="Resto" /></a>
						</div>
						<!----start-top-nav---->
						 <nav class="top-nav">
							<ul class="top-nav">
								<li><a href="index.html">主页</a></li>
								<li class="active"><a href="menu.html">菜单</a></li>
								<li class="active"><a href="news.html"> 购物车</a></li>
								<li><a href="register.html">注册</a></li>
								<li><a href="login.html"> 登录</a></li>
								<li><a href="reviews.html">Reviews</a></li>
							</ul>
							<a href="#" id="pull"><img src="${pageContext.request.contextPath}/WebContent/images/nav-icon.png" title="menu" /></a>
						</nav>
						<div class="clearfix"> </div>
					</div>
				</div>
			</div>
			<!----- //End-header---->
			<!----- menu-page ----->
			<div class="reservation">
				<!------ menu-header ----->
				<div class="reservation-header">
					<div class="container">
						<h1><span>Resto</span> Reservation</h1>
					</div>
				</div>
				<!------ menuheader ----->
			<div class="clearfix"> </div>
			<!----- reservation ---->
			<div class="reservation-form">
				<div class="container">
					<h2><span> </span>&nbsp;&nbsp;&nbsp;&nbsp; Register &nbsp;<span> </span></h2>
					<p>在这里注册您的新账号</p>
				</div>
				<!----- make-Reserver ------>
				<div class="make-reserve">
					<div class="container">
						<h3>欢迎</h3>
						<p>请按要求填写表格</p>
					
					<!------ reserv-form ----->
					<div class="reserv-form">
						<form name="form" action="RegisterServlet" method="post">
					<!-- 	<div class="item-setion">
							<span>Item-Seletion</span>
							<select>
								<option>Item-name</option>
								<option>Item-name</option>
								<option>Item-name</option>
								<option>Item-name</option>
								<option>Item-name</option>
							</select>
						</div> -->
						<!----->
						<!-- <div class="i-date">
							<span>Time</span>
							<div class="i-date-grids">
								<div class="i-date-left">
									<input type="text">
									<label>HH</label>
								</div>
								<div class="i-date-right">
									<input type="text">
									<label>MM</label>
								</div>
								<div class="clearfix"> </div>
							</div>
						</div> -->
						<div class="clearfix"> </div>
						<!----->
						<!-- <div class="i-qty">
							<span>Item-Quantity</span>
							<select>
								<option>1</option>
								<option>2</option>
								<option>3</option>
								<option>4</option>
								<option>5</option>
							</select>
						</div> -->
						<!----->
						<!-- <div class="i-name"> -->
							<div class="i-email">
								<span>用户名</span>
								<input id="username" type="text" name="userName">
								<span id="regis_span" style="display: inline-block;color: #47A447;"></span>
							</div>
							
							<!-- <div class="i-name-left">
								<span>Last-Name</span>
								<input type="text">
							</div> -->
							<div class="clearfix"> </div>
						<!-- </div> -->
						<div class="clearfix"> </div>
						<!----->
						<div class="i-email">
							<span>密码</span>
							<input id="password" type="password" name="userPassword">
							
						</div>
						<div class="i-email">
							<span>确认密码</span>
							<input id="repassword" type="password" name="userConfirmPassword">
							<span id="pass_span" style="display: inline-block;color: #66AFE9;"></span>
						</div>
						<div class="i-qty">
							<span>性别</span>
							<select name="userGender">
								<option>--请选择--</option>
								<option value="1" name="man">男</option>
								<option value="0" name="value">女</option>
							</select>
						</div>
						<!-- <div class="i-email">
							<span>邮箱</span>
							<input type="text">
						</div> -->
						<!----->
						<!-- <div class="i-textarea">
							<span>Notes</span>
							<textarea> </textarea>
						</div> -->
						<input type="submit" value="提交" />
						</form>
					</div>
					<!------ reserv-form ----->
				</div>
				</div>
				<!----- make-Reserver ------>
			</div>
			<!----- fearuted-diesh ----->
			<div class="fearuted-diesh">
				<div class="container">
					<h3>Featured Dishes<span> </span></h3>
					<!----sreen-gallery-cursual---->
						<div class="sreen-gallery-cursual">
							 <!-- requried-jsfiles-for owl -->
							<link href="${pageContext.request.contextPath}/WebContent/css/owl.carousel.css" rel="stylesheet">
							    <script src="${pageContext.request.contextPath}/WebContent/js/owl.carousel.js"></script>
							        <script>
							    $(document).ready(function() {
							      $("#owl-demo").owlCarousel({
							         items :4,
							        lazyLoad : true,
							        autoPlay : true,
							        navigation : false,
							        navigationText :  false,
							        pagination : true,
							      });
							    });
							    </script>
							 <!-- //requried-jsfiles-for owl -->
							 <!-- start content_slider -->
						       <div id="owl-demo" class="owl-carousel">
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d1.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Fugiat nulla sint</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$30</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d2.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Daute irure dolor</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$24</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d3.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Officia deserunt mollit</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$60</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d4.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Pim minim veniam</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$17</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d1.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Fugiat nulla sint</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$30</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d2.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Daute irure dolor</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$24</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d3.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Officia deserunt mollit</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$60</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
					                <div class="item">
					                	<div class="item-grid">
					                		<div class="item-pic">
					                			<img src="images/d4.jpg" title="dish-name" />
					                		</div>
					                		<div class="item-info">
					                			<div class="item-info-left">
					                				<h4>Pim minim veniam</h4>
					                				<span class="item-rate"> </span>
					                			</div>
					                			<div class="item-info-right">
					                				<label>$17</label>
					                			</div>
					                			<div class="clearfix"> </div>
					                		</div>
					                	</div>
					                </div>
					                <!----->
				              </div>
						<!--//sreen-gallery-cursual---->
				</div>
			</div>
			</div>
			</div>
			<!----- fearuted-diesh ----->
			<!----- End-Menu-page ----->
			<!----- footer ----->
			<div class="footer">
				<div class="container">
					<div class="footer-grids">
						<div class="col-md-3 footer-grid">
							<p>
								<span>New York Restaurant</span>
								<span>3926 Anmoore Road</span>
								<span>New York, NY 10014</span>
								<span>718-749-1714</span>
							</p>
						</div>
						<div class="col-md-3 footer-grid">
							<p>
								<span>France Restaurant</span>
								<span>68, rue  de la Couronne</span>
								<span>75002 PARIS</span>
								<span>02.94.23.69.56</span>
							</p>
						</div>
						<div class="col-md-3 footer-grid">
							<ul>
								<li><a href="#">Blog</a></li>
								<li><a href="#">Careers</a></li>
								<li><a href="#">Privacy Policy</a></li>
								<li><a href="contact.html">Contact</a></li>
							</ul>
						</div>
						<div class="col-md-3 footer-grid copy-right">
							<a href="#"><img src="images/flogo.png" title="resto" /></a>
							<p>Copyright &copy; 2014.Company name All rights reserved.<a target="_blank" href="http://www.freemoban.com/">HTML5网站</a></p>
						</div>
						<div class="clearfix"> </div>
					</div>
				</div>
			</div>
			<!----- footer ----->
	
</body>
</html>

