﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace project.common.Response
{
    public class MultipleResponse : BaseResponse
    {
        #region -- Methods --

        /// <summary>
        /// Initialize
        /// </summary>
        public MultipleResponse() : base() { }

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="message">Message</param>
        public MultipleResponse(string message) : base(message) { }

        /// <summary>
        /// Initialize
        /// </summary>
        /// <param name="message">Message</param>
        /// <param name="titleError">Title error</param>
        public MultipleResponse(string message, string titleError) : base(message, titleError) { }

        /// <summary>
        /// Set data
        /// </summary>
        /// <param name="key">Key</param>
        /// <param name="o">Data</param>
        public void SetData(string key, object o)
        {
            if (Data == null)
            {
                Data = new Dictionary<string, object>();
            }

            Data.Add(key, o);
        }

        /// <summary>
        /// Set success data
        /// </summary>
        /// <param name="o">Data</param>
        /// <param name="message">Message</param>
        public void SetSuccess(object o, string message)
        {
            var t = new Dto(o, message);

            SetData("success", t);
        }

        /// <summary>
        /// Set failure data
        /// </summary>
        /// <param name="o">Data</param>
        /// <param name="message">Message</param>
        public void SetFailure(object o, string message)
        {
            var t = new Dto(o, message);

            SetData("failure", t);
        }

        #endregion

        #region -- Properties --

        /// <summary>
        /// Data
        /// </summary>
        public Dictionary<string, object> Data { get; private set; }

        #endregion

        #region -- Classes --

        /// <summary>
        /// Data transfer object
        /// </summary>
        public class Dto
        {
            #region -- Methods --

            /// <summary>
            /// Initialize
            /// </summary>
            /// <param name="data">Data</param>
            /// <param name="message">Message</param>
            public Dto(object data, string message)
            {
                Data = data;
                Message = message;
            }

            #endregion

            #region -- Properties --

            /// <summary>
            /// Data
            /// </summary>
            public object Data { get; private set; }

            /// <summary>
            /// Message
            /// </summary>
            public string Message { get; private set; }

            #endregion
        }

        #endregion
    }
}
