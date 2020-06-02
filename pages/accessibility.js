import Layout from "../components/Layouts/Layout";
import Heading from "../components/Heading";
import { projectName } from "../constants/projectSettings";

const Accessibility = () => {
	return (
		<Layout headerVersions={["bg-light"]} fixed={true} headerTheme="dark">
			<div className="c-accessibility__page-title">
				<Heading versions={["large"]} parentClass="c-accessibility">
					Website accessibility
				</Heading>
			</div>
			<div className="c-accessibility__content">
				<Heading>Welcome to CBD {projectName}</Heading>
				<div className="container">
					{projectName} LLC, a Delaware limited liability company d/b/a CBD{" "}
					{projectName} collectively referred to in this privacy policy as “CBD
					{projectName},” the “Company” or sometimes “we” or “us” or “our”),
					operates the website located at the URL www.CBDbene.com (together with
					any other website or applications branded as CBD {projectName}{" "}
					(collectively, the “Website”). CBD bene is committed to making our
					website accessible to all our customers. We have been making changes
					to improve website accessibility and will continue to monitor and make
					improvements going forward. If you would like to send us feedback
					about our website, please contact us using the email:
					customerservice@cbdbene.com
				</div>
			</div>
		</Layout>
	);
};

export default Accessibility;
