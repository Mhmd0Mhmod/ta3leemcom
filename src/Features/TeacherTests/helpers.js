import axios from "axios";

export async function getTests(groupsIds, token) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/GetAllQuizsByGroupsIds?GroupsIds=${groupsIds.join("&GroupsIds=")}`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function getTest(quizId, token) {
  if (quizId == 0 || !quizId) return null;

  try {
    const { data } = await axios.get(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/GetQuizById?QuizId=${quizId}`, {
      headers: { Authorization: token },
    });
    const quiz = Object.entries(data).reduce((acc, [key, value]) => {
      if (key === "questionsOfQuizzes") {
        acc.questions = [...value];
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    return quiz;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}
export async function addOnlineQuiz(data, token) {
  console.log(data);

  const bodyData = {
    ...data,
    questions: data.questions.map((question) => ({
      content: question.content,
      explain: question.explain,
      mark: question.mark,
      type: question.type,
      choices: question.choices.map((choice) => ({
        content: choice.content,
        isCorrect: choice.isCorrect,
      })),
    })),
  };
  try {
    const { data } = await axios.post(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/AddOnlineQuiz`, bodyData, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}
export async function deleteQuiz(quizId, token) {
  try {
    const { data } = await axios.delete(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/DeleteQuiz?id=${quizId}`, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}

export async function updateNotStartedQuiz(bodyData, token) {
  try {
    const { data } = await axios.put(`${import.meta.env.VITE_TA3LEMCOM_API_URL}/Quiz/UpdateOnlineQuizBeforeStart`, bodyData, {
      headers: { Authorization: token },
    });
    return data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}
