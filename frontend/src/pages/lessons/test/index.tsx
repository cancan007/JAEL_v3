import { useRouter } from "next/router";
import TestPage from "../../../components/Lesson/TestPage";
import { LessonSection } from "../../../types/types";
import verbTests from "../../../utils/tests/verb-conjugation/tests";
import adTests from "../../../utils/tests/adjective/tests";
import { useMemo } from "react";

const VerificationTest: React.FC = () => {
  const router = useRouter();
  const { section, unit } = router.query as {
    section: LessonSection;
    unit: string;
  };
  const tests = useMemo(() => {
    return (
      (section === LessonSection.verbConjugation
        ? verbTests
        : section === LessonSection.adjective
        ? adTests
        : []
      )?.find((a) => a.unit === Number(unit)) || verbTests[0] //最後のverbTests[0]はビルドする際にundefinedエラーになるため、やむなくつけた
    );
  }, [section, unit]);

  return <TestPage testInfos={tests}></TestPage>;
};

export default VerificationTest;
